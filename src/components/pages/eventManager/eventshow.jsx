import { useEffect, useState } from "react";
import useResponse from "../../customHooks/useResponse";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";

export default function EventShow() {
    const { getApiHandler } = useApiHandlers();
    const { notify } = useResponse();
    const [datalist, setDatalist] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getApiHandler(`${ApiPaths.event}`);
        if (response.status === 200) {
            console.log(response.data);
            setDatalist(response.data);
        } else {
            notify({ title: "Error!", text: response.data, icon: "error" });
        }
    };

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
                        {datalist && datalist.length > 0 && datalist.map((list, index) => (
                            <div className="col-lg-3" key={index}>
                                <div className="card">
                                    <img src={`${ApiPaths.site_url}${list.profileImage}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{list.eventName}</h5>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </p>
                                        {list.dateTime && list.dateTime.length > 0 ? (
                                            <p>{list.dateTime[0].date}</p>
                                        ) : (
                                            <p>No date available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </section>
            </main>


        </>
    );
} 