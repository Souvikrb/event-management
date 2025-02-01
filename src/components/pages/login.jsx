import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import useApiHandlers from "../../api/ApiHandlers";
import ApiPaths from "../../api/ApiPaths";
import useResponse from "../customHooks/useResponse";
import axios from "axios";
export default function Login() {
    const { notify } = useResponse();
    const navigate = useNavigate();
    useEffect(()=>{
        const token = sessionStorage.getItem('loginToken');
        if(token) navigate("/")
    })
    const { postApiHandler} = useApiHandlers();
    const location = useLocation();
    const param = (location.pathname == '/login')?'serviceprovider':'admin';
    const [formdata, SetFormdata] = useState(
        {
            email: "",
            password: ""
        }
    );
    

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiPaths.login}?type=${param}`, formdata, {
              headers: { "Accept": "Application/json"},
            });
            let token = response.data.token;
            sessionStorage.setItem('loginToken', token);
            notify({title:"Success!",text:response.data.message,icon:"success"});
            navigate("/")
          } catch (error) {
            const data =
              error.response && error.response.data
                ? error.response.data.message
                : error.message || "Something went wrong";
              if (error.response && error.response.status === 401) {
                 navigate("/login");
              }
              notify({title:"Error!",text:data,icon:"error"});
          }

    }
    return (

        <>
            
            <main style={{ backgroundImage: `url('./assets/img/loginbg1.avif')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">
                                                    Login to Your Account
                                                </h5>
                                                <p className="text-center small">
                                                    Enter your Email Id &amp; Password to login
                                                </p>
                                            </div>
                                            <form className="row g-3 needs-validation" noValidate="" onSubmit={loginSubmit}>
                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">
                                                        Email Id
                                                    </label>
                                                    <div className="input-group has-validation">
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            className="form-control"
                                                            id="yourUsername"
                                                            required=""
                                                            onChange={(e) => SetFormdata({ ...formdata, [e.target.name]: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        id="yourPassword"
                                                        required=""
                                                        onChange={(e) => SetFormdata({ ...formdata, [e.target.name]: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">
                                                        Login
                                                    </button>
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

        </>
    )
}