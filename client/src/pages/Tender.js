import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth';
const Tender = () => {
    const [tenders, setTenders] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
    const getAllTenders = async () => {
      try {
        const headers ={Authorization : `${auth.token}`}
        const { data } = await axios.get("/api/tender/getTender",
        {headers});
        setTenders(data.tenders);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong in getting products");
      }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllTenders();
    }, []);
    return (
      <Layout title="tenders">
        <div className="row dashboard">
          <div className="col-md-3">
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Tenders List</h1>
            <div className="d-flex flex-wrap">
              {tenders?.map((p) => (
                <Link
                  key={p._id}
                  to={`/t/SingleTender/${p._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img style={{  width: '80%',
    height: '75%' }}
                      src={"/images/hammer.jpg"}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.title}</h5>
                      <p className="card-text">{p.budget}</p>
                      {/* <p className="card-text">{p.category.name}</p> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  

export default Tender