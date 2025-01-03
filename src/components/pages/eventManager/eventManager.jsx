import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiPaths from "../../../api/ApiPaths";
import useApiHandlers from "../../../api/ApiHandlers";
import useResponse from "../../customHooks/useResponse";

export default function EventList() {
    const { getApiHandler, deleteApiHandler } = useApiHandlers();
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getApiHandler(`${ApiPaths.event}`);
        if (response.status === 200) {
            setDatalist(response.data);
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const response = await deleteApiHandler(`${ApiPaths.event}/${id}`);
                if (response.status === 200) {
                    setDatalist((prevDatalist) => prevDatalist.filter(item => item._id !== id));
                    notify({ title: "Success!", text: response.data, icon: "success" });
                } else {
                    notify({ title: "Error!", text: response.data, icon: "error" });
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                notify({ title: "Error!", text: "An error occurred while deleting the event.", icon: "error" });
            }
        }
    };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Event List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Event List</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-right">
                                        <Link to="/event/add" className="btn btn-primary btn-sm">
                                            Add New Event
                                        </Link>
                                    </h5>
                                    {/* Horizontal Form */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Event Name</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datalist && datalist.length > 0 ? datalist.map((list, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{list.eventName}</td>
                                                    <td>
                                                        {list.profileImage ? (
                                                            <img
                                                                src={`${ApiPaths.site_url}${list.profileImage}`}
                                                                alt={list.eventName}
                                                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                                                            />
                                                        ) : (
                                                            "No Image"
                                                        )}
                                                    </td>
                                                    <td>{new Date(list.dateTime).toLocaleString()}</td>
                                                    <td>
                                                        <Link to={`/event/add/${list._id}`}>
                                                            <i className="bx bxs-pencil text-primary" style={{ cursor: "pointer" }}></i>
                                                        </Link>&nbsp;
                                                        <i className="bx bx-trash text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(list._id)}></i>&nbsp;
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">No events found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {/* End Horizontal Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
