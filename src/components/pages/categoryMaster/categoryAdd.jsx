import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApiHandlers from "../../../api/ApiHandlers";
import ApiPaths from "../../../api/ApiPaths";
import useResponse from "../../customHooks/useResponse";

export default function CategoryAdd() {
    const defaultFormValues = {
        parent_id:null,
        M_CODE:'MASTER_CATEGORY',
        DESC1:'',
        DESC2:''
    }
    const {getApiHandler,postApiHandler} = useApiHandlers();
    const [formdata,setFormdata] = useState(defaultFormValues)
    const { notify } = useResponse();
    const [datalist,setDatalist] = useState([]);
    useEffect(()=>{
       
        fetchMasterList();
    },[])
    const fetchMasterList = async () => {
        const response = await getApiHandler(`${ApiPaths.master_list}/MASTER_CATEGORY`);
        if(response.status == 200){
            setDatalist(response.data);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const masterres = await postApiHandler(ApiPaths.master_add,formdata);
        if(masterres.status === 200 || masterres.status == 201){
            setFormdata(defaultFormValues);
            fetchMasterList();
            notify({title:"Success!",text:masterres.data,icon:"success"});
        }else{
            notify({title:"Error!",text:masterres.data,icon:"error"});
        }
    }
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Category Master</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">Configaration</li>
                            <li className="breadcrumb-item active">Category Master</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-right"></h5>
                                    {/* Horizontal Form */}
                                    <form method="post" onSubmit={submitHandler}>
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Parent Category
                                            </label>
                                            <div className="col-sm-7">
                                                <select value={formdata?.parent_id || ''}  className="form-control" name="parent_id" onChange={(e)=>setFormdata({...formdata,[e.target.name]:e.target.value})}>
                                                    <option  key="0" value="">--select--</option>
                                                    { (datalist) &&
                                                    datalist.map((list,index)=>(
                                                        <option key={index} value={list._id}>{list.DESC1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-sm-2">

                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label
                                                htmlFor="inputEmail3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                Category
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" value={formdata?.DESC1 || ''}  className="form-control" name="DESC1" onChange={(e)=>setFormdata({...formdata,[e.target.name]:e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="/category" className="btn btn-secondary">
                                                Back
                                            </Link>&nbsp;
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                    {/* End Horizontal Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}