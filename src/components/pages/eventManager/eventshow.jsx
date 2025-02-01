import { useEffect, useState } from "react";
import useResponse from "../../customHooks/useResponse";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import { useParams } from "react-router-dom";

export default function EventShow() {
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
    const { getApiHandler,postApiHandler } = useApiHandlers();
    const { notify } = useResponse();
    const [formdata, setFormdata] = useState(defaultFormValues);
    const [bookingdata,setBookingdata] = useState({
        eventId:'',
        dateId:'',
        timeslotId:'',
        promocode:''
    })
    const [timeslots,setTimeslots] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        fetchData();
        getBookings();
    }, []);
    const getBookings = async () => {
        const response = await getApiHandler(`${ApiPaths.booking}/678633f9cdd6291db0760566`);
        console.log(response);
    }
    const fetchData = async () => {
        const response = await getApiHandler(`${ApiPaths.event}/${id}`);
        if (response.status === 200) {
            setFormdata(response.data);
            setBookingdata(prv=>({...prv,eventId:response.data._id}))
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };
    const getTimeSlot = (dateId) => {
        setBookingdata(prv=>({...prv,dateId}))
        const item = formdata.dateTime.find(data =>data._id == dateId);
        const timeslots = item ? item.timeSlots :'';
        setTimeslots(timeslots);
    }
    const convertToAmPm = (time) => {
        const [hours, minutes] = time.split(":").map(Number); // Split and convert to numbers
        const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
        const convertedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`; // Format the time
    };
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bookEvent = async () => {
        const response = await postApiHandler(ApiPaths.booking,bookingdata);
    }
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Cards</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">Components</li>
                            <li className="breadcrumb-item active">Cards</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row align-items-top">
                            <div className="col-lg-6" >
                                <div className="card">
                                    {/* <img src={`${ApiPaths.site_url}${formdata.profileImage}`} className="card-img-top" alt="..." /> */}
                                    <div className="card-body">
                                        <h5 className="card-title">{formdata.eventName}</h5>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </p>
                                        {formdata.dateTime && formdata.dateTime.length > 0 ? (
                                            formdata.dateTime.map((d,index)=>{
                                                const newdate = new Date(d.date);
                                                const day = newdate.getDate();
                                                const month = newdate.toLocaleString("default", { month: "long" });
                                                const weekday = weekdays[newdate.getDay()];
                                                return (
                                                    <div key={d._id} onClick={() => getTimeSlot(d._id)}>
                                                        <div>{day}  <br/> {month} <br/>{weekday}</div>
                                                            
                                                    </div>
                                                    );
                                                    
                                            })
                                        ) : (
                                            <p>No date available</p>
                                        )}
                                        {timeslots && 
                                            timeslots.map((slot, slotIndex) => {
                                                const time24 = slot.stime;
                                                const time12 = convertToAmPm(time24);
                                                return(
                                                    <p onClick={(e)=>setBookingdata(prv => ({...prv,timeslotId:slot._id}))}>{time12}</p>
                                                    
                                                );
                                            }
                                                
                                            )
                                        }<br></br>
                                        <button onClick={bookEvent}>Book Now</button>
                                    </div>
                                </div>
                            </div>

                    </div>
                </section>
            </main>


        </>
    );
} 