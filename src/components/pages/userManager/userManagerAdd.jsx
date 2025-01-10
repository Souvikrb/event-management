
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";
export default function UserManagerAdd() {
    const defaultFormValues = {
        name: "",
        phone: "",
        email: "",
        password: "",
        profileImage: "",
        status: "active",
        role: "",
        designation: ""
    }
    const { postApiHandler, getApiHandler, putApiHandler } = useApiHandlers();
    const [formData, setFormData] = useState(defaultFormValues);

    const [profileImage, setProfileImage] = useState("");
    const [errors, setErrors] = useState({});
    const { notify } = useResponse();
    const [profileData, setProfileData] = useState([]);
    const { id } = useParams();
    const Navigate = useNavigate();
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = "Full Name is required";
        if (!formData.phone) errors.phone = "Phone is required";
        //if (!formData.password) errors.password = "Password is required";
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.password) errors.password = "Password is required";
        if (!formData.role) errors.role = "Role is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

    useEffect(() => {
        if (id)
            fetchSingledata(id);
    }, [id])
    const fetchSingledata = async (id) => {
        const response = await getApiHandler(`${ApiPaths.users}/${id}`);
        if (response.status == 200) {
            const userData = response.data;
            console.log(userData)
            setFormData(userData);
            setProfileData(userData);
        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        setFormData(prvdata => ({ ...prvdata, profileImage: file }));
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // Update the profile image with the file data
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        let response;
        if (id) {
            response = await putApiHandler(`${ApiPaths.users}/${id}`, formData);
        } else {
            response = await postApiHandler(ApiPaths.users, formData);
        }

        if (response.status == 200 || response.status == 201) {
            Navigate(`/user/add`);
            setFormData(defaultFormValues);
            notify({ title: "Success!", text: response.data, icon: "success" })
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" })
        }
    };
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>User Manager</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">User Manager</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section profile">
                    <div className="row">

                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* Bordered Tabs */}
                                    <ul className="nav nav-tabs nav-tabs-bordered">

                                        <li className="nav-item">
                                            <button
                                                className={`nav-link active`}
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile-edit"
                                            >
                                                Add Profile
                                            </button>
                                        </li>

                                    </ul>
                                    <div className="tab-content pt-2">

                                        <div className={`tab-pane fade active show profile-edit`} id="profile-edit">
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-3">
                                                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                                                        Profile Image
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        {profileImage ? <img style={{ width: "110px" }} src={profileImage} alt="Profile" />
                                                            : formData.profileImage ? <img style={{ width: "110px" }} src={`${ApiPaths.site_url}${formData.profileImage}`} alt="Profile" />
                                                                : ''
                                                        }
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
                                                <div className="row mb-3">
                                                    <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">
                                                        Full Name
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                            id="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">
                                                        Phone
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="phone"
                                                            type="text"
                                                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                                            id="Phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">
                                                        Email
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                            id="Email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                                    </div>
                                                </div>
                                                {!id && (
                                                    <div className="row mb-3">
                                                        <label htmlFor="Password" className="col-md-4 col-lg-3 col-form-label">
                                                            Password
                                                        </label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input
                                                                name="password"
                                                                type="password"
                                                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                                id="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="row mb-3">
                                                    <label htmlFor="role" className="col-md-4 col-lg-3 col-form-label">
                                                        User Role
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <select
                                                            name="role"
                                                            className={`form-control ${errors.role ? "is-invalid" : ""}`}
                                                            value={formData.role}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select role</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="manager">Manager</option>
                                                            <option value="user">User</option>

                                                        </select>
                                                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="designation" className="col-md-4 col-lg-3 col-form-label">
                                                        Designation
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="designation"
                                                            type="text"
                                                            className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                                                            id="designation"
                                                            value={formData.designation}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                                                    </div>
                                                </div>

                                                < div >
                                                    <button type="submit" className="btn btn-primary">
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}