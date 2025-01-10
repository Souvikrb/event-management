import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";

export default function CategoryAdd() {
    const defaultFormValues = {
        parent_id: null,
        M_CODE: 'MASTER_CATEGORY',
        DESC1: '',
        DESC2: '',
        DESC3:""
    }
    const { getApiHandler, postApiHandler } = useApiHandlers();
    const [formdata, setFormdata] = useState(defaultFormValues)
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);
    const [image,setImage] = useState();
    const { id } = useParams();
    const [errors, setErrors] = useState({}); // Track errors for each field
    const navigate = useNavigate();
    useEffect(() => {
        fetchMasterList();
        if (id) {
            fetchUpdateData(id); // Fetch data if editing
        }
    }, [])
    const fetchUpdateData = async (id) => {
        const response = await getApiHandler(`${ApiPaths.master_singledata}/${id}`);
        if (response.status == 200) {
            setFormdata((prvdata)=>({...prvdata,
                parent_id: response.data.parent_id,
                DESC1: response.data.DESC1,
                DESC2: response.data.DESC2,
                DESC3: response.data.DESC3,
            }));
            response.data.DESC2 && setImage(`${ApiPaths.site_url}${response.data.DESC2}`)
            
        }
    };
    const fetchMasterList = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CATEGORY`);
        if (response.status == 200) {
            setDatalist(response.data);
        }
    }

    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
        if(fileInputRef.current)
            fileInputRef.current.click();

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormdata(prvdata=>({...prvdata,DESC2:file}));
        const render = new FileReader();
        if(render.onload = () => {
            setImage(render.result)
        })
        render.readAsDataURL(file);
    }

    const removeImage = () => {
        setImage('');
        setFormdata(prvdata=>({...prvdata,DESC2:''}))
    }

    const submitHandler = async (e) => {
            e.preventDefault();
            // Reset errors before validation
            setErrors({});
            // Validate form fields
            const newErrors = {};

            if (!formdata.DESC1) {
                newErrors.DESC1 = "Category name is required";
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
                setImage('');
                navigate("/category/add")
                notify({ title: "Success!", text: masterres.data, icon: "success" });
            } else {
                notify({ title: "Error!", text: masterres.data, icon: "error" });
            }
        };
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Category Master</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">Configaration</li>
                            <li className="breadcrumb-item active">Category Master</li>
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
                                                Parent Category
                                            </label>
                                            <div className="col-sm-7">
                                                <select value={formdata?.parent_id || ''} className="form-control" name="parent_id" onChange={(e) => setFormdata({ ...formdata, [e.target.name]: e.target.value })}>
                                                    <option key="0" value="">--select--</option>
                                                    {(datalist) &&
                                                        datalist.map((list, index) => (
                                                            <option key={index} value={list._id}>{list.DESC1}</option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div className="col-sm-2">

                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Category
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" value={formdata?.DESC1 || ''} className={`form-control ${errors.DESC1 ? 'is-invalid' : ''}`} name="DESC1" onChange={(e) => setFormdata({ ...formdata, [e.target.name]: e.target.value })} />
                                                {errors.DESC1 && (
                                                    <div className="invalid-feedback">{errors.DESC1}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Category Description
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" value={formdata?.DESC3 || ''} className={`form-control ${errors.DESC3 ? 'is-invalid' : ''}`} name="DESC3" onChange={(e) => setFormdata({ ...formdata, [e.target.name]: e.target.value })} />
                                                {errors.DESC3 && (
                                                    <div className="invalid-feedback">{errors.DESC3}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                                                Category Image
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                {image && (<img style={{ "width": "110px" }} src={image} alt="Profile" />)}
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
                                                    <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image" onClick={removeImage}>
                                                        <i className="bi bi-trash" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="/category" className="btn btn-secondary">
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