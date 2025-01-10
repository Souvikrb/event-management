import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";

export default function NotificationAdd() {
    const defaultFormValues = {
        title: '',
        description: '',
        link: ''
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
    const Navigate = useNavigate();
    const dataHandler = (e) =>{
        const {name, value} = e.target;
        setFormdata((prvdata)=>({...prvdata,[name]:value}))
    }
    // Fetch location data for editing
    const fetchUpdateData = async (id) => {
        const response = await getApiHandler(`${ApiPaths.notification}/${id}`);
        if (response.status == 200) {
            setFormdata((prvdata) => ({
                ...prvdata,
                title: response.data.title,
                description: response.data.description,
                link: response.data.link
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

        if (!formdata.title) {
            newErrors.title = "Notification title is required";
        }
        if (!formdata.description) {
            newErrors.description = "Notification description is required";
        }

        // If there are validation errors, set them and stop form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let masterres;
        if (id) {
            masterres = await putApiHandler(`${ApiPaths.notification}/${id}`, formdata);
        } else {
            masterres = await postApiHandler(`${ApiPaths.notification}`, formdata);
        }
        if (masterres.status === 200 || masterres.status == 201) {
            setFormdata(defaultFormValues);
            Navigate('/notification/add');
            notify({ title: "Success!", text: masterres.data, icon: "success" });
        } else {
            notify({ title: "Error!", text: masterres.data, icon: "error" });
        }
    };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Notification Manager</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Notification Manager</li>
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
                                                Notification Title
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    value={formdata.title || ''}
                                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                    name="title"
                                                    onChange={dataHandler}
                                                />
                                                {errors.title && (
                                                    <div className="invalid-feedback">{errors.title}</div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                               Description
                                            </label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                    name="description"
                                                    onChange={dataHandler} value={formdata.description} />
                                                {errors.description && (
                                                    <div className="invalid-feedback">{errors.description}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Link
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    value={formdata.link || ''}
                                                    className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                                                    name="link"
                                                    onChange={dataHandler}
                                                />
                                                {errors.link && (
                                                    <div className="invalid-feedback">{errors.link}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Link to="/notification" className="btn btn-secondary">
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
