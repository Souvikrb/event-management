
import { Link, useParams } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import { useEffect, useState } from "react";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";
export default function City() {
    const { getApiHandler,deleteApiHandler } = useApiHandlers();
    const [datalist, setDatalist] = useState([]);
    const { id } = useParams();
    const { notify } = useResponse()
    const cityId = id || '';
    // Fetch countries when the component mounts
    useEffect(() => {
            fetchData(); 
        }, []);
    const fetchData = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CITY`);
        if (response.status === 200) {
            setDatalist(response.data);
        }else{
            notify({title:"Error!",text:response.data,icon:"error"})
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                // Call your API to delete the item
                const response = await deleteApiHandler(`${ApiPaths.master_delete}/${id}`);

                if (response.status === 200) {
                    // Update the datalist by filtering out the deleted item
                    setDatalist((prevDatalist) => prevDatalist.filter(item => item._id !== id));
                    notify({title:"Success!",text:response.data,icon:"success"});
                } else {
                    notify({title:"Error!",text:response.data,icon:"error"});
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
                    <h1>City List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">City List</li>
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
                                        <Link to="/city/add" className="btn btn-primary btn-sm">
                                            Add New
                                        </Link></h5>
                                    {/* Horizontal Form */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">City</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        {datalist && datalist.length > 0 ? datalist.map((list, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{list.DESC1}</td>
                                                    <td>{list.parentName || '---'}</td>
                                                    <td>
                                                        <Link to={`/city/add/${list._id}`}><i className="bx bxs-pencil text-primary" style={{ cursor: "pointer" }}></i></Link>&nbsp;
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