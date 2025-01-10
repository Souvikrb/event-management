import { Link, useNavigate, useParams } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import { useEffect, useState } from "react";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";
import useFirebaseNotifications  from '../../../firebaseNotification/useFirebaseNotifications';
import axios from "axios";
export default function Notification() {
    const { getApiHandler, deleteApiHandler,postApiHandler } = useApiHandlers();
    const [datalist, setDatalist] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    const { id } = useParams();
    const { notify } = useResponse();
    const dataId = id || "";
    const Navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);
    const {SendAgain} = useFirebaseNotifications();
    useEffect(() => {
        handleSearch();
    }, [searchTerm, datalist]);

    const fetchData = async () => {
        const response = await getApiHandler(`${ApiPaths.notification}`);
        if (response.status === 200) {
            setDatalist(response.data);
            setFilteredData(response.data); // Initialize filtered data
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await deleteApiHandler(`${ApiPaths.notification}/${id}`);
                if (response.status === 200) {
                    setDatalist((prevDatalist) => prevDatalist.filter((item) => item._id !== id));
                    notify({ title: "Success!", text: response.data, icon: "success" });
                } else {
                    notify({ title: "Error!", text: response.data, icon: "error" });
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("An error occurred while deleting the item.");
            }
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredData(datalist);
        } else {
            const lowercasedTerm = searchTerm.toLowerCase();
            const filtered = datalist.filter(
                (item) =>
                    item.DESC1.toLowerCase().includes(lowercasedTerm) ||
                    (item.parentName && item.parentName.toLowerCase().includes(lowercasedTerm))
            );
            setFilteredData(filtered);
        }
        setCurrentPage(1); // Reset to the first page on new search
    };

    const sentNotification = async (id) => {
        // const token = await requestForToken()
        // console.log(token)
        SendAgain();
        const notificationToken = sessionStorage.getItem('notificationToken')
        const dataset = await getApiHandler(`${ApiPaths.notification}/${id}`);
        if(dataset.status == 200 && notificationToken){
            const pushNotification = {
                token:notificationToken,
                title:dataset.data.title,
                body:dataset.data.description
            }
            const res = await axios.post(ApiPaths.pushNotification,pushNotification,{ headers:{"Accept":"Application/json"},})
            console.log(res);
        }
        
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Notification List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Notification List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-right">
                                        <Link to="/notification/add" className="btn btn-primary btn-sm">
                                            Add New
                                        </Link>
                                    </h5>
                                    {/* Search Bar */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search "
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    {/* Table */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Link</th>
                                                <th scope="col"></th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems && currentItems.length > 0 ? (
                                                currentItems.map((list, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{indexOfFirstItem + index + 1}</th>
                                                        <td>{list.title}</td>
                                                        <td>{list.description}</td>
                                                        <td>{list.link}</td>
                                                        <td><button onClick={(e)=>sentNotification(list._id)} className="btn btn-sm btn-warning">Fire</button></td>
                                                        <td>
                                                            <Link to={`/notification/update/${list._id}`}>
                                                                <i
                                                                    className="bx bxs-pencil text-primary"
                                                                    style={{ cursor: "pointer" }}
                                                                ></i>
                                                            </Link>
                                                            &nbsp;
                                                            <i
                                                                className="bx bx-trash text-danger"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleDelete(list._id)}
                                                            ></i>
                                                            &nbsp;
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No data found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {/* Pagination */}
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li
                                                    key={index}
                                                    className={`page-item ${
                                                        currentPage === index + 1 ? "active" : ""
                                                    }`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => paginate(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
