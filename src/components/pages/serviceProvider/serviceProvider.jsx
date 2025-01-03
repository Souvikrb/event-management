
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiPaths from "../../../api/ApiPaths";
import useApiHandlers from "../../../api/ApiHandlers";
import useResponse from "../../customHooks/useResponse";
export default function ServiceProvider() {
    const { getApiHandler, deleteApiHandler,putApiHandler } = useApiHandlers();
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const response = await getApiHandler(`${ApiPaths.serviceprovider}`);
        console.log(response);
        if (response.status === 200) {
            setDatalist(response.data);
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" })
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                // Call your API to delete the item
                const response = await deleteApiHandler(`${ApiPaths.serviceprovider}/${id}`);

                if (response.status === 200) {
                    // Update the datalist by filtering out the deleted item
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
    const approveHandler = async (id,currentStatus) => {
       const updateStatus = (currentStatus == 'active')?'inactive':'active';
       const data = {status:updateStatus}
       const response = await putApiHandler(`${ApiPaths.serviceproviderApprove}/${id}`,data);
       if(response.status == 200){
        fetchData();
        notify({ title: "Success!", text: response.data, icon: "success" });
       }else{
        notify({ title: "Error!", text: response.data, icon: "error" });
       }
    };
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Service Provider List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Service Provider List</li>
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
                                        <Link to="/serviceprovider/add" className="btn btn-primary btn-sm">
                                            Add New
                                        </Link></h5>
                                    {/* Horizontal Form */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datalist && datalist.length > 0 ? datalist.map((list, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{list.fullName}</td>
                                                    <td>{list.phone}</td>
                                                    <td>{list.email}</td>
                                                    <td><div class="form-check form-switch">
                                                            <input class="form-check-input" type="checkbox" id={`flexSwitchCheckChecked${index}`} onChange={e =>approveHandler(list._id,list.status)} checked={list.status == 'active' && 'checked'} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Link to={`/serviceprovider/update/${list._id}`}><i className="bx bxs-pencil text-primary" style={{ cursor: "pointer" }}></i></Link>&nbsp;
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