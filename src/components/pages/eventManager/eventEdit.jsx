
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEditSection from "./section/addEditSection";
import useResponse from "../../customHooks/useResponse";
import ApiPaths from "../../../api/ApiPaths";
import useApiHandlers from "../../../api/ApiHandlers";
export default function EventEdit() {
    const { id } = useParams();
    const [profileData, setProfileData] = useState([]);
    const { getApiHandler } = useApiHandlers();
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:mm"
    };
        useEffect(()=>{
            if(id)
                fetchSingledata(id);
        },[id])
        const fetchSingledata = async (id) => {
            const response = await getApiHandler(`${ApiPaths.event}/${id}`);
            if(response.status == 200){
                const eventData = response.data;
                setProfileData({...eventData,
                    dateTime:eventData.dateTime?formatDateTime(eventData.dateTime):""
                } );
            } 
        }
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Event Manager</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Event Manager</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section profile">
                    <div className="row">

                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
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
                                                Event Details
                                            </button>
                                        </li>
                                        {/* <li className="nav-item" role="presentation">
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
                                        </li> */}
                                    </ul>
                                    <div className="tab-content pt-2" id="myTabContent">
                                        
                                        <AddEditSection profileId={id} profileData={profileData} />
                                        {/* <div
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
                                        </div> */}
                                    </div>
                                    {/* End Pills Tabs */}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}