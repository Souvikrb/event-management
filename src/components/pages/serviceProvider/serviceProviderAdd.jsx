
import { Link, useParams } from "react-router-dom";
import AddProfile from "./section/addProfile";
import { useState } from "react";
export default function ServiceProviderAdd() {
    const { id } = useParams();
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
                                    
                                    <AddProfile  />
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