import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiPaths from "../../../api/ApiPaths";
import useApiHandlers from "../../../api/ApiHandlers";
import useResponse from "../../customHooks/useResponse";

export default function EventList() {
    const { getApiHandler, deleteApiHandler,putApiHandler } = useApiHandlers();
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const rowsPerPage = 5;
    const filteredData = datalist.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
        )
    );
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRow = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
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

    const approveSpecialistHandler = async (id, currentStatus) => {
        const updateStatus = (currentStatus == 'active') ? 'inactive' : 'active';
        const data = { status: updateStatus }
        const response = await putApiHandler(`${ApiPaths.eventSpecialist}/${id}`, data);
        if (response.status == 200) {
            fetchData();
            notify({ title: "Success!", text: response.data, icon: "success" });
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };

    const approveHandler = async (id, currentStatus) => {
        const updateStatus = (currentStatus == 'active') ? 'inactive' : 'active';
        const data = { status: updateStatus }
        const response = await putApiHandler(`${ApiPaths.eventApprove}/${id}`, data);
        if (response.status == 200) {
            fetchData();
            notify({ title: "Success!", text: response.data, icon: "success" });
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
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
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
                                    />
                                    {/* Horizontal Form */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Event Name</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Is Specialist</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRow && currentRow.length > 0 ? currentRow.map((list, index) => (
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
                                                    <td>{list.dateTime && list.dateTime.length > 0 ? (
                                                        <p>{list.dateTime[0].date}</p>
                                                    ) : (
                                                        <p>No date available</p>
                                                    )}</td>
                                                    <td><div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id={`flexSwitchCheckChecked${index}`} onChange={e => approveSpecialistHandler(list._id, list.isSpecialist)} checked={list.isSpecialist == 'active' && 'checked'} />
                                                    </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id={`approveSwitchCheckChecked${index}`} onChange={e => approveHandler(list._id, list.status)} checked={list.status == 'active' && 'checked'} />
                                                        </div>
                                                    </td>
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
                                    <div style={{ marginTop: "10px" }}>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handlePageChange(index + 1)}
                                                style={{
                                                    margin: "0 5px",
                                                    padding: "5px 10px",
                                                    backgroundColor: currentPage === index + 1 ? "#007bff" : "#fff",
                                                    color: currentPage === index + 1 ? "#fff" : "#000",
                                                    border: "1px solid #007bff",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
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
