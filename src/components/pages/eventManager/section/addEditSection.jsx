import React, { useEffect, useRef, useState } from "react";
import useApiHandlers from "../../../../api/ApiHandlers";
import ApiPaths from "../../../../api/ApiPaths";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useResponse from "../../../customHooks/useResponse";

const AddEditSection = ({ profileId = null, profileData,formData,setFormData,validateForm,handleSubmit,errors}) => {


    const { postApiHandler, getApiHandler, putApiHandler } = useApiHandlers();
    
    const [profileImage, setProfileImage] = useState("");
    const [categories, setCategories] = useState([]);
    const [provider, setProvider] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const { notify } = useResponse();

    const fileInputRef = useRef(null);

    // Validate form
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        fetchCountries();
        fetchProvider();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "country") {
            fetchCity(value); // Fetch cities based on selected country
        }
        if (name === "city") {
            fetchLocation(value); // Fetch locations based on selected city
        }
    };

    useEffect(() => {
        if (profileId != null) {
            fetchCity();
            fetchLocation();
        }
    }, []);

    const fetchCategories = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CATEGORY`);
        if (response.status === 200) {
            setCategories(response.data);
        }
    };

    const fetchProvider = async () => {
        const response = await getApiHandler(`${ApiPaths.serviceprovider}`);
        if (response.status === 200) {
            setProvider(response.data);
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
        setFormData((prevData) => ({ ...prevData, profileImage: file }));
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    
    return (
       
            <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="row mb-3">
                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                        Event Image
                    </label>
                    <div className="col-md-8 col-lg-9">
                        {profileImage ? <img style={{ width: "110px" }} src={profileImage} alt="Profile" />
                        :formData.profileImage ? <img style={{ width: "110px" }} src={`${ApiPaths.site_url}${formData.profileImage}`} alt="Profile" />
                        :''
                        }
                        <div className="pt-2">
                            <a
                                href="#"
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleFileUpload();
                                }}
                            >
                                <i className="bi bi-upload" />
                            </a>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Event Name */}
                <div className="row mb-3">
                    <label htmlFor="eventName" className="col-md-4 col-lg-3 col-form-label">
                        Event Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="eventName"
                            type="text"
                            className={`form-control ${errors.eventName ? "is-invalid" : ""}`}
                            id="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                        />
                        {errors.eventName && <div className="invalid-feedback">{errors.eventName}</div>}
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="providerName" className="col-md-4 col-lg-3 col-form-label">
                        Provider Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                    <select
                            name="providerName"
                            className={`form-control select2 ${errors.providerName ? "is-invalid" : ""}`}
                            value={formData.providerName}
                            onChange={handleChange}
                        >
                            <option value="">Select provider</option>
                            {provider.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        {errors.providerName && <div className="invalid-feedback">{errors.providerName}</div>}
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">
                        Phone Number
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="phone"
                            type="text"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                </div>       
                {/* Event Description */}
                <div className="row mb-3">
                    <label htmlFor="eventDescription" className="col-md-4 col-lg-3 col-form-label">
                        Event Details
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <textarea
                            name="eventDescription"
                            className={`form-control ${errors.eventDescription ? "is-invalid" : ""}`}
                            id="eventDescription"
                            style={{ height: 100 }}
                            value={formData.eventDescription}
                            onChange={handleChange}
                        />
                        {errors.eventDescription && <div className="invalid-feedback">{errors.eventDescription}</div>}
                    </div>
                </div>        
                <div className="row mb-3">
                    <label htmlFor="price" className="col-md-4 col-lg-3 col-form-label">
                       Ticket Price
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="price"
                            type="text"
                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <div className="invalid-feedback">{errors.phone}</div>}
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
                            { Array.isArray(categories) && categories.map((category) => (
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

                <div>
                    <Link to="/event" className="btn btn-secondary">
                        Back
                    </Link>
                    &nbsp;
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
    );
};

export default AddEditSection;
