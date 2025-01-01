import React, { useEffect, useRef, useState } from "react";
import useApiHandlers from "../../../../api/ApiHandlers";
import ApiPaths from "../../../../api/ApiPaths";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useResponse from "../../../customHooks/useResponse";

const AddEditSection = ({ profileId = null, profileData }) => {
    const defaultFormValues = {
        eventName: "",
        eventHighlight: "",
        dateTime: "",
        country: "",
        city: "",
        location: "",
        profileImage: "",
        category: "",
        status: "active",
    };

    const { postApiHandler, getApiHandler, putApiHandler } = useApiHandlers();
    const [formData, setFormData] = useState(defaultFormValues);
    const [profileImage, setProfileImage] = useState("");
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const { notify } = useResponse();

    const fileInputRef = useRef(null);

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
    

    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!formData.eventName) errors.eventName = "Event Name is required";
        if (!formData.eventHighlight) errors.eventHighlight = "Event Highlight is required";
        if (!formData.dateTime) {
            errors.dateTime = "Date & Time is required";
        } else if (new Date(formData.dateTime) < new Date()) {
            errors.dateTime = "Date & Time cannot be in the past";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        fetchCountries();
    }, []);

    useEffect(() => {
        if (profileId != null) {
            fetchCity();
            fetchLocation();
            setFormData(profileData);
        }
    }, [profileData]);

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        let response;
        if (profileId) {
            response = await putApiHandler(`${ApiPaths.event}/${profileId}`, formData);
        } else {
            response = await postApiHandler(ApiPaths.event, formData);
        }

        if (response.status === 200 || response.status === 201) {
            navigate('/event/add')
            notify({ title: "Success!", text: response.data, icon: "success" });
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };

    return (
        <div className="tab-pane fade show active">
            <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="row mb-3">
                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">
                        Profile Image
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

                {/* Event Highlight */}
                <div className="row mb-3">
                    <label htmlFor="eventHighlight" className="col-md-4 col-lg-3 col-form-label">
                        Event Highlight
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <textarea
                            name="eventHighlight"
                            className={`form-control ${errors.eventHighlight ? "is-invalid" : ""}`}
                            id="eventHighlight"
                            style={{ height: 100 }}
                            value={formData.eventHighlight}
                            onChange={handleChange}
                        />
                        {errors.eventHighlight && <div className="invalid-feedback">{errors.eventHighlight}</div>}
                    </div>
                </div>

                {/* Date & Time */}
                <div className="row mb-3">
                    <label htmlFor="dateTime" className="col-md-4 col-lg-3 col-form-label">
                        Date & Time
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="dateTime"
                            type="datetime-local"
                            className={`form-control ${errors.dateTime ? "is-invalid" : ""}`}
                            id="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                        />
                        {errors.dateTime && <div className="invalid-feedback">{errors.dateTime}</div>}
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
        </div>
    );
};

export default AddEditSection;
