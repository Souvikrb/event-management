import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";

export default function LocationAdd() {
    const defaultFormValues = {
        parent_id: null,
        M_CODE: 'MASTER_LOCATION',
        DESC1: '',
        DESC2: ''
    };

    const { getApiHandler, postApiHandler, putApiHandler } = useApiHandlers();
    const [formdata, setFormdata] = useState(defaultFormValues);
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);
    const [errors, setErrors] = useState({}); // Track errors for each field
    const {id} = useParams();

    useEffect(() => {
        fetchMasterList();
        if (id) {
            fetchUpdateData(id); // Fetch data if editing
        }
    }, []);

    const fetchMasterList = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CITY`);
        if (response.status == 200) {
            setDatalist(response.data);
        }
    };

    // Fetch location data for editing
    const fetchUpdateData = async (id) => {
        const response = await getApiHandler(`${ApiPaths.master_singledata}/${id}`);
        if (response.status == 200) {
            setFormdata((prvdata)=>({...prvdata,
                parent_id: response.data.parent_id,
                DESC1: response.data.DESC1,
                DESC2: response.data.DESC2,
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Reset errors before validation
        setErrors({});

        // Validate form fields
        const newErrors = {};

        if (!formdata.parent_id) {
            newErrors.parent_id = "City is required";
        }
        if (!formdata.DESC1) {
            newErrors.DESC1 = "Location name is required";
        }

        // If there are validation errors, set them and stop form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let masterres;
        if(id){
            masterres = await postApiHandler(`${ApiPaths.master_add}/${id}`, formdata);
        }else{
            masterres = await postApiHandler(`${ApiPaths.master_add}`, formdata);
        }
        if (masterres.status === 200 || masterres.status == 201) {
            setFormdata(defaultFormValues);
            notify({ title: "Success!", text: masterres.data, icon: "success" });
        } else {
            notify({ title: "Error!", text: masterres.data, icon: "error" });
        }
    };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Location Master</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">Configuration</li>
                            <li className="breadcrumb-item active">Location Master</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-right"></h5>
                                    {/* Horizontal Form */}
                                    <form method="post" onSubmit={submitHandler}>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                City
                                            </label>
                                            <div className="col-sm-7">
                                                <select
                                                    value={formdata?.parent_id || ''}
                                                    className={`form-control ${errors.parent_id ? 'is-invalid' : ''}`}
                                                    name="parent_id"
                                                    onChange={(e) => setFormdata({ ...formdata, [e.target.name]: e.target.value })}
                                                >
                                                    <option key="0" value="">
                                                        --select--
                                                    </option>
                                                    {datalist &&
                                                        datalist.map((list, index) => (
                                                            <option key={index} value={list._id}>
                                                                {list.DESC1}
                                                            </option>
                                                        ))}
                                                </select>
                                                {errors.parent_id && (
                                                    <div className="invalid-feedback">{errors.parent_id}</div>
                                                )}
                                            </div>
                                            <div className="col-sm-2"></div>
                                        </div>

                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Location
                                            </label>
                                            <div className="col-sm-7">
                                                <input
                                                    type="text"
                                                    value={formdata?.DESC1 || ''}
                                                    className={`form-control ${errors.DESC1 ? 'is-invalid' : ''}`}
                                                    name="DESC1"
                                                    onChange={(e) => setFormdata({ ...formdata, [e.target.name]: e.target.value })}
                                                />
                                                {errors.DESC1 && (
                                                    <div className="invalid-feedback">{errors.DESC1}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="/location" className="btn btn-secondary">
                                                Back
                                            </Link>
                                            &nbsp;
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
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
