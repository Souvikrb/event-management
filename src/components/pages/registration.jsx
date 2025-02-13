import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApiHandlers from "../../api/ApiHandlers";
import useResponse from "../customHooks/useResponse";
import ApiPaths from "../../api/ApiPaths";
import axios from "axios";

const Registration = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        otp: "",
        role:"serviceprovider",
        status:"0"
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const { postApiHandler} = useApiHandlers();
    const { notify } = useResponse();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendOtp = async() => {
        if (formData.email) {
            try {
                const response = await axios.post(ApiPaths.emailOtpSend, {email:formData.email}, {
                    headers: { "Accept": "Application/json"},
                });
                if(response.status == 200){ setOtpSent(true); }
                notify({ title: "Success!", text: response.data.message, icon: "success" });
            }catch(error){
                const data =
                error.response && error.response.data
                    ? error.response.data.message
                    : error.message || "Something went wrong";
                notify({title:"Error!",text:data,icon:"error"});
            }
            
        } else {
            notify({ title: "Error!", text: "Please enter a valid email.", icon: "error" });
        }
    };

    const verifyOtp = async() => {
        // Simulate OTP verification
        if (formData.otp) {
            try {
                const response = await axios.post(ApiPaths.emailOtpverify, {email:formData.email,otp:formData.otp}, {
                    headers: { "Accept": "Application/json"},
                });
                if(response.status == 200){ setOtpVerified(true);setOtpSent(false); }
                notify({ title: "Success!", text: response.data.message, icon: "success" });
            }catch(error){
                const data =
                error.response && error.response.data
                    ? error.response.data.message
                    : error.message || "Something went wrong";
                notify({title:"Error!",text:data,icon:"error"});
            }
        } else {
            notify({ title: "Error!", text: "Please enter a valid OTP.", icon: "error" });
        }
    };

    const handleGoogleVerification = () => {
        alert("Google verification initiated!");
        // Implement Google Sign-In logic here
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!otpVerified) {
            notify({ title: "Error!", text: "Please verify your email OTP before submitting.", icon: "error" });
            return;
        }
        const response = await postApiHandler(ApiPaths.register,formData);
        if (response.status == 200 || response.status == 201) {
            navigate(`/login`);
            notify({ title: "Success!", text: response.data, icon: "success" })
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" })
        }
        // Implement actual form submission logic here
    };

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-4 d-flex flex-column align-items-center justify-content-center">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">
                                                Register
                                            </h5>
                                            <p className="text-center small">
                                                Enter your details to create an account
                                            </p>
                                        </div>
                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="name" className="form-label">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="name"
                                                    required
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="phone" className="form-label">
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    id="phone"
                                                    required
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className={`col-9 ${otpVerified ?'col-12':'col-9'}`}>
                                                        <label htmlFor="email" className="form-label">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className={`form-control ${otpVerified ?'is-valid':''}`}
                                                            id="email"
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-3">
                                                        {!otpVerified && (
                                                            <div className="col-12">
                                                                <label htmlFor="email" className="form-label">
                                                                    &nbsp;
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary w-100"
                                                                    onClick={sendOtp}
                                                                >
                                                                    OTP
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {otpSent && (
                                                <div className="col-12">
                                                    <label htmlFor="otp" className="form-label">
                                                        Enter OTP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="otp"
                                                        className="form-control"
                                                        id="otp"
                                                        required
                                                        onChange={handleInputChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mt-2"
                                                        onClick={verifyOtp}
                                                    >
                                                        Verify OTP
                                                    </button>
                                                </div>
                                            )}
                                            <div className="col-12">
                                                <label htmlFor="password" className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    type="text"
                                                    name="password"
                                                    className="form-control"
                                                    id="password"
                                                    required
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <button
                                                    className="btn btn-primary w-100"
                                                    type="submit"
                                                    disabled={!otpVerified}
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger w-100 mb-2"
                                                    onClick={handleGoogleVerification}
                                                >
                                                    Verify with Google
                                                </button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">
                                                    Already have an account?{" "}
                                                    <Link to="/login">Log in</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Registration;
