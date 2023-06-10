import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth';
import ConsumerMenu from '../../components/Layout/ConsumerMenu';
import Layout from './../../components/Layout/Layout';
const CCategories = () => {
    const [categories, setCategories] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
     const getAllCategories = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const response = await axios.get(`/api/tender/categories`, { headers });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };
  
    //lifecycle method
    useEffect(() => {
      getAllCategories();
    }, []);
    return (
        <Layout title="Categories">
          <div className="container-fluid m-3 p-3 dashboard">
            <div className="row dashboard">
              <div className="col-md-3">
                <ConsumerMenu/>
              </div>
              <div className="col-md-9">
                <h1 className="text-center">Categories List</h1>
                <div className="d-flex flex-wrap">
                  <div className="card-container">
                    {categories.map((category) => (
                      <div className="card" key={category}>
                        <Link to={`/dashboard/consumer/categories/${category}/${auth?.user?._id}`} className="card-link">
                          {category}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };
    
    export default CCategories;