
import { Link, useParams } from "react-router-dom";
import AddProfile from "./section/addProfile";
import { useEffect, useState } from "react";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
export default function ServiceProviderEdit() {
    const { id } = useParams();
    const { getApiHandler } = useApiHandlers();
    const [profileData, setProfileData] = useState([]);
    useEffect(()=>{
        if(id)
            fetchSingledata(id);
    },[id])
    const fetchSingledata = async (id) => {
        const response = await getApiHandler(`${ApiPaths.serviceprovider}/${id}`);
        if(response.status == 200){
            setProfileData(response.data);
        } 
    }
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Service Provider</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Service Provider</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section profile">
                    <div className="row">
                    
                        <div className="col-xl-10">
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
                                               Edit Profile
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile-settings"
                                            >
                                                Settings
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile-change-password"
                                            >
                                                Change Password
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                    <AddProfile profileId={id} profileData={profileData} />
                                       
                                        <div className="tab-pane fade pt-3" id="profile-settings">
                                            {/* Settings Form */}
                                            <form>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="fullName"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Email Notifications
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="changesMade"
                                                                defaultChecked=""
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="changesMade"
                                                            >
                                                                Changes made to your account
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="newProducts"
                                                                defaultChecked=""
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="newProducts"
                                                            >
                                                                Information on new products and services
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="proOffers"
                                                            />
                                                            <label className="form-check-label" htmlFor="proOffers">
                                                                Marketing and promo offers
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="securityNotify"
                                                                defaultChecked=""
                                                                disabled=""
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="securityNotify"
                                                            >
                                                                Security alerts
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                            {/* End settings Form */}
                                        </div>
                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            {/* Change Password Form */}
                                            <form>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="currentPassword"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Current Password
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            className="form-control"
                                                            id="currentPassword"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="newPassword"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        New Password
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="newpassword"
                                                            type="password"
                                                            className="form-control"
                                                            id="newPassword"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="renewPassword"
                                                        className="col-md-4 col-lg-3 col-form-label"
                                                    >
                                                        Re-enter New Password
                                                    </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="renewpassword"
                                                            type="password"
                                                            className="form-control"
                                                            id="renewPassword"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">
                                                        Change Password
                                                    </button>
                                                </div>
                                            </form>
                                            {/* End Change Password Form */}
                                        </div>
                                    </div>
                                    {/* End Bordered Tabs */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}