
import { Link } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import { useEffect, useState } from "react";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";
export default function Country() {
    const { getApiHandler, deleteApiHandler } = useApiHandlers();
    const [datalist, setDatalist] = useState([]);
    const { notify } = useResponse()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    // Fetch countries when the component mounts
    useEffect(() => { fetchData(currentPage); }, [currentPage]);
    const fetchData = async (page) => {
        const response = await getApiHandler(`${ApiPaths.master_listwithpagination}/MASTER_COUNTRY?page=${page}&limit=3`);
        if (response.status === 200) {
            setDatalist(response.data.data);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" })
        }
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                // Call your API to delete the item
                const response = await deleteApiHandler(`${ApiPaths.master_delete}/${id}`);

                if (response.status === 200) {
                    setDatalist((prevDatalist) => prevDatalist.filter(item => item._id !== id));
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

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Country List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Country List</li>
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
                                        <Link to="/country/add" className="btn btn-primary btn-sm">
                                            Add New
                                        </Link></h5>
                                    {/* Horizontal Form */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {datalist && datalist.length > 0 ? datalist.map((list, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{list.DESC1}</td>
                                                    <td>
                                                        <Link to={`/country/add/${list._id}`}><i className="bx bxs-pencil text-primary" style={{ cursor: "pointer" }}></i></Link>&nbsp;
                                                        <i className="bx bx-trash text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(list._id)}></i>&nbsp;
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No data found</td>
                                                </tr>
                                            )}




                                        </tbody>
                                    </table>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item">
                                                <button class="page-link" type="button" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}>
                                                    <span aria-hidden="true">«</span>
                                                </button>
                                            </li>
                                            <li class="page-item" style={{color: "#0a58ca",fontSize: "14px",padding: "9px 10px"}}><span> Page {currentPage} of {totalPages} </span></li>
                                            <li class="page-item">
                                                <button class="page-link" type="button" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}>
                                                    <span aria-hidden="true">»</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
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