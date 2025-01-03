
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AddEditSection from "./section/addEditSection";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";
import DateTimeSection from "./section/dateTimeSection";
import TermsSection from "./section/termsSection";
export default function EventAdd() {
    const defaultFormValues = {
        eventName: "",
        eventHighlight: "",
        eventDescription: "",
        dateTime: "",
        country: "",
        city: "",
        location: "",
        profileImage: "",
        category: "",
        providerName: "",
        phone: "",
        status: "active",
        termsTitle: "",
        termsDetails: "",
        price:""
    };
    const { notify } = useResponse();
    const [formData, setFormData] = useState(defaultFormValues);
    const [profileData, setProfileData] = useState([]);
    const [errors, setErrors] = useState({});
    const { postApiHandler, getApiHandler, putApiHandler } = useApiHandlers();
    const validateForm = () => {
        const errors = {};
        if (!formData.eventName) errors.eventName = "Event Name is required";
        if (!formData.providerName) errors.providerName = "Provider name is required";
        if (!formData.phone) errors.phone = "Phone number is require";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const { id } = useParams();
    const navigate = useNavigate();
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (!validateForm()) {
            return;
        }
        let response;
        if (id) {
            response = await putApiHandler(`${ApiPaths.event}/${id}`, formData);
        } else {
            response = await postApiHandler(ApiPaths.event, formData);
        }

        if (response.status === 200 || response.status === 201) {
            console.log(response);
            navigate(`/event/add/${response.alldata.data._id}`)
            notify({ title: "Success!", text: response.data, icon: "success" });
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };

    useEffect(() => {
        if (id)
            fetchSingledata(id);
    }, [id])
    const fetchSingledata = async (id) => {
        const response = await getApiHandler(`${ApiPaths.event}/${id}`);
        if (response.status == 200) {
            const eventData = response.data;
            setFormData(eventData);
            setProfileData(eventData);
            setDates(eventData.dateTime || []);
        }
    }


    const [dates, setDates] = useState([

    ]);



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
                                                Basic
                                            </button>
                                        </li>
                                        {id && (
                                            <>
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
                                                        Date Time Setup
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
                                                        Terms & Condition
                                                    </button>
                                                </li>
                                            </>

                                        )}


                                    </ul>
                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-home"
                                            role="tabpanel"
                                            aria-labelledby="home-tab"
                                        >
                                            <AddEditSection profileId={id} profileData={profileData} formData={formData} setFormData={setFormData} validateForm={validateForm} handleSubmit={handleSubmit} errors={errors} />
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="profile-tab"
                                        >
                                            <DateTimeSection setFormData={setFormData} formData={formData} profileData={profileData} handleSubmit={handleSubmit} dates={dates} setDates={setDates} />
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-contact"
                                            role="tabpanel"
                                            aria-labelledby="contact-tab"
                                        >
                                            <TermsSection formData={formData} setFormData={setFormData} validateForm={validateForm} handleSubmit={handleSubmit} />
                                        </div>
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