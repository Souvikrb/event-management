import React, { useEffect, useRef, useState } from "react";
import useApiHandlers from "../../../../api/ApiHandlers";
import ApiPaths from "../../../../api/ApiPaths";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useResponse from "../../../customHooks/useResponse";

const TermsSection = ({ formData,setFormData,handleSubmit}) => {
    const { postApiHandler, getApiHandler, putApiHandler } = useApiHandlers();
    const { notify } = useResponse();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]:value})
    };
    return (
       
            <form onSubmit={handleSubmit}>
             
                <div className="row mb-3">
                    <label htmlFor="termsTitle" className="col-md-4 col-lg-3 col-form-label">
                        Terms Title
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="termsTitle"
                            type="text"
                            className={`form-control }`}
                            id="termsTitle"
                            value={formData.termsTitle}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="termsDetails" className="col-md-6 col-lg-6 col-form-label">
                        Terms & Condition Details
                    </label>
                </div>        
                <div className="row mb-3">
                    <div className="col-md-12 col-lg-12">
                        <textarea
                            name="termsDetails"
                            className={`form-control`}
                            id="termsDetails"
                            style={{ height: 100 }}
                            value={formData.termsDetails}
                            onChange={handleChange}
                        />
                    </div>
                </div>  

                <div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
    );
};

export default TermsSection;
