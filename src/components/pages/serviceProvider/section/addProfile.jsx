import React, { useEffect, useRef, useState } from "react";
import useApiHandlers from "../../../../api/ApiHandlers";
import ApiPaths from "../../../../api/ApiPaths";
import { Navigate } from "react-router-dom";
import useResponse from "../../../customHooks/useResponse";
const AddProfile = ({profileId = null, profileData}) => {
    const defaultFormValues = {
        fullName: "",
        phone: "",
        email: "",
        password:"",
        about: "",
        country: "",
        city: "",
        location: "",
        profileImage: "",
        category: "",
        status:"active"
    }
    const { postApiHandler,getApiHandler,putApiHandler } = useApiHandlers();
    const [formData, setFormData] = useState(defaultFormValues);

    const [profileImage, setProfileImage] = useState("");
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const { notify } = useResponse();
    

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "country") {
            fetchCity(value); // Fetch locations based on selected city
        }
        if (name === "city") {
            fetchLocation(value); // Fetch locations based on selected city
        }
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
        if (!formData.phone) errors.phone = "Phone is required";
        //if (!formData.password) errors.password = "Password is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
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
        fetchCategories();
        fetchCountries();
    }, []);

    useEffect(()=>{
        if(profileId != null){
            fetchCity();
            fetchLocation();
            setFormData(profileData);
        }  
    },[profileData])
    
    
    

    const fetchCategories = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CATEGORY`);
        if (response.status === 200) {
            setCategories(response.data);
        }
    };
    const fetchCountries = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_COUNTRY`);
        if (response.status === 200) {
            setCountries(response.data);
        }
    };

    const fetchCity = async (id) => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CITY`);
        if (response.status === 200) {
            setCities(response.data);
        }
    };

    const fetchLocation = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_LOCATION`);
        if (response.status === 200) {
            setLocations(response.data);
        }
    };


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
        if(profileId){
            
            response = await putApiHandler(`${ApiPaths.serviceprovider}/${profileId}`, formData);
        }else{
            response = await postApiHandler(ApiPaths.serviceprovider, formData);
        }
        
        if (response.status == 200 || response.status == 201) {
            //Navigate(`/serviceprovider/`);
            notify({ title: "Success!", text: response.data, icon: "success" })
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" })
        }
    };

    return (
        <>
            <div className={`tab-pane fade active show profile-edit`} id="profile-edit">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                            Profile Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                            {profileImage && (<img style={{ "width": "110px" }} src={profileImage} alt="Profile" />)}
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
                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">
                            Full Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                                name="fullName"
                                type="text"
                                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
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
                    {/* <div className="row mb-3">
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
                    </div> */}
                    <div className="row mb-3">
                        <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">
                            About
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <textarea
                                name="about"
                                className={`form-control ${errors.about ? "is-invalid" : ""}`}
                                id="about"
                                style={{ height: 100 }}
                                value={formData.about}
                                onChange={handleChange}
                            />
                            {errors.about && <div className="invalid-feedback">{errors.about}</div>}
                        </div>
                    </div>
                    {/* Category */}
                    <div className="row mb-3">
                        <label htmlFor="category" className="col-md-4 col-lg-3 col-form-label">
                            Category
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <select
                                name="category"
                                className={`form-control select2 ${errors.category ? "is-invalid" : ""}`}
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.DESC1}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                    </div>

                    {/* Country */}
                    <div className="row mb-3">
                        <label htmlFor="country" className="col-md-4 col-lg-3 col-form-label">
                            Country
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <select
                                name="country"
                                className={`form-control select2 ${errors.country ? "is-invalid" : ""}`}
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option value="">Select country</option>
                                {countries.map((country) => (
                                    <option key={country._id} value={country._id}>
                                        {country.DESC1}
                                    </option>
                                ))}
                            </select>
                            {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                        </div>
                    </div>

                    {/* City */}
                    <div className="row mb-3">
                        <label htmlFor="city" className="col-md-4 col-lg-3 col-form-label">
                            City
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <select
                                name="city"
                                className={`form-control select2 ${errors.city ? "is-invalid" : ""}`}
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select city</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.DESC1}
                                    </option>
                                ))}
                            </select>
                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>
                    </div>
                    {/* Location */}
                    <div className="row mb-3">
                        <label htmlFor="location" className="col-md-4 col-lg-3 col-form-label">
                            Location
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <select
                                name="location"
                                className={`form-control select2 ${errors.location ? "is-invalid" : ""}`}
                                value={formData.location}
                                onChange={handleChange}
                            >
                                <option value="">Select location</option>
                                {locations.map((location) => (
                                    <option key={location._id} value={location._id}>
                                        {location.DESC1}
                                    </option>
                                ))}
                            </select>
                            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                        </div>
                    </div>

                    < div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default AddProfile;
