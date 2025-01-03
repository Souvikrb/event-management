import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";

export default function AdvertisementAdd() {
    const defaultFormValues = {
        adsname: '',
        fdate: '',
        tdate: '',
        adsImg: ''
    };

    const { getApiHandler, postApiHandler, putApiHandler } = useApiHandlers();
    const [formdata, setFormdata] = useState(defaultFormValues);
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);
    const [errors, setErrors] = useState({}); // Track errors for each field
    const { id } = useParams();
    const [adsImg, setAdsImg] = useState("");
    useEffect(() => {
        if (id) {
            fetchUpdateData(id); // Fetch data if editing
        }
    }, []);

    const dataHandler = (e) =>{
        const {name, value} = e.target;
        setFormdata((prvdata)=>({...prvdata,[name]:value})) 
        console.log(formdata);
    }
    // Fetch location data for editing
    const fetchUpdateData = async (id) => {
        const response = await getApiHandler(`${ApiPaths.master_singledata}/${id}`);
        if (response.status == 200) {
            setFormdata((prvdata) => ({
                ...prvdata,
                parent_id: response.data.parent_id,
                DESC1: response.data.DESC1,
                DESC2: response.data.DESC2,
            }));
        }
    };
    const fileInputRef = useRef(null);
    const handleFileUpload = () =>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormdata((prvdata)=>({...prvdata,adsImg:file}))
        if(file){
            const render = new FileReader()
            render.onload = () => {
                setAdsImg(render.result); // Update the profile image with the file data
            };
            render.readAsDataURL(file);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Reset errors before validation
        setErrors({});

        // Validate form fields
        const newErrors = {};

        if (!formdata.adsname) {
            newErrors.adsname = "Advertisement name is required";
        }

        // If there are validation errors, set them and stop form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let masterres;
        if (id) {
            masterres = await postApiHandler(`${ApiPaths.advertisement}/${id}`, formdata);
        } else {
            masterres = await postApiHandler(`${ApiPaths.advertisement}`, formdata);
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
                    <h1>Advertisement Manager</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Advertisement Manager</li>
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
                                                Advertisement Name
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    value={formdata.adsname || ''}
                                                    className={`form-control ${errors.adsname ? 'is-invalid' : ''}`}
                                                    name="adsname"
                                                    onChange={dataHandler}
                                                />
                                                {errors.adsname && (
                                                    <div className="invalid-feedback">{errors.adsname}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label>Start Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control me-2"
                                                    value={formdata.fdate || ''}
                                                    name="fdate"
                                                    onChange={dataHandler}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>End Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control me-2"
                                                    value={formdata.tdate || ''}
                                                    name="tdate"
                                                    onChange={dataHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                                                Ads Image
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                {adsImg && (<img style={{ "width": "110px" }} src={adsImg} alt="Profile" />)}
                                                <div className="pt-2">
                                                    <a
                                                        href="#"
                                                        className="btn btn-primary btn-sm"
                                                        title="Upload new profile image"
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent default anchor behavior
                                                            handleFileUpload();
                                                        }}
                                                    >
                                                        <i className="bi bi-upload" />
                                                    </a>&nbsp;
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{ display: "none" }} // Hide the file input
                                                        onChange={handleFileChange}
                                                    />
                                                    <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image">
                                                        <i className="bi bi-trash" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Link to="/advertisement" className="btn btn-secondary">
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
