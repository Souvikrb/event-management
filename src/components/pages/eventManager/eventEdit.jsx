import React, { useState, useRef } from "react";

const EventEdit = () => {


    return (
        <main id="main" className="main">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Pills Tabs</h5>
                    {/* Pills Tabs */}
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                            >
                                Profile
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                            >
                                Contact
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content pt-2" id="myTabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                        >
                            testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            Nesciunt totam et. Consequuntur magnam aliquid eos nulla dolor iure eos
                            quia. Accusantium distinctio omnis et atque fugiat. Itaque doloremque
                            aliquid sint quasi quia distinctio similique. Voluptate nihil recusandae
                            mollitia dolores. Ut laboriosam voluptatum dicta.
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-contact"
                            role="tabpanel"
                            aria-labelledby="contact-tab"
                        >
                            Saepe animi et soluta ad odit soluta sunt. Nihil quos omnis animi
                            debitis cumque. Accusantium quibusdam perspiciatis qui qui omnis magnam.
                            Officiis accusamus impedit molestias nostrum veniam. Qui amet ipsum
                            iure. Dignissimos fuga tempore dolor.
                        </div>
                    </div>
                    {/* End Pills Tabs */}
                </div>
            </div>
        </main>


    );
};

export default EventEdit;
