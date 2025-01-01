import {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiPaths from "../../../api/ApiPaths";
import useApiHandlers from "../../../api/ApiHandlers";
import useResponse from "../../customHooks/useResponse";
export default function CountryAdd() {
    const defaultFormValues = {
        parent_id: null,
        M_CODE: 'MASTER_COUNTRY',
        DESC1: '',
        DESC2: ''
    };
    const {notify} = useResponse();
    const [formdata,setFormdata] = useState(defaultFormValues);
    const {postApiHandler,getApiHandler} = useApiHandlers();
    const {id = null} = useParams();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (id) {
            fetchUpdateData(id); // Fetch data if editing
        }
    }, []);
    // Fetch country data for editing
    const fetchUpdateData = async (id) => {
        const response = await getApiHandler(`${ApiPaths.master_singledata}/${id}`);
        if (response.status == 200) {
            setFormdata((prvdata)=>({...prvdata,
                DESC1: response.data.DESC1
            }));
        }
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        // Reset errors before validation
        setErrors({});
        // Validate form fields
        const newErrors = {};
        if (!formdata.DESC1) {
            newErrors.DESC1 = "Country name is required";
        }

        // If there are validation errors, set them and stop form submission
        console.log(newErrors);
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
        
    }
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Country Setup</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">Configaration</li>
                            <li className="breadcrumb-item active">Country Setup</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-right">
                                        </h5>
                                    {/* Horizontal Form */}
                                    <form method="post" onSubmit={submitHandler}>
                                        
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Country
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" value={formdata.DESC1} name="DESC1" className={`form-control ${errors.DESC1 ? 'is-invalid' : ''}`} id="country" onChange={(e)=>setFormdata({...formdata,[e.target.name]: e.target.value})} />
                                                {errors.DESC1 && (
                                                    <div className="invalid-feedback">{errors.DESC1}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="/country" className="btn btn-secondary">
                                                Back
                                            </Link>&nbsp;
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
    )
}