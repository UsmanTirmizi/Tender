import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
     const getAllUsers = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const {data} = await axios.get(`/api/user/getUsers`, { headers });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting users");
    }
  };
  
    //lifecycle method
    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <Layout title="allusers">
          <div className="container-fluid m-3 p-3 dashboard">
            <div className="row dashboard">
              <div className="col-md-3">
                <AdminMenu/>
              </div>
              <div className="col-md-9">
                <h1 className="text-center">All User List</h1>
                <div className="d-flex flex-wrap">
              {users?.map((p) => (
                <Link
                  key={p._id}
                  to={`SingleUser/${p._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img style={{  width: '80%',
    height: '75%' }}
                      src={"/images/hammer.jpg"}
                      className="card-img-top"
                      alt={p.username}
                    />
                    <div className="card-body">
                    <h5 className="card-title">{p.username}</h5>
                      <p className="card-text">{p.companyName}</p>
                      <p className="card-text">{p.email}</p>
                      <p className="card-text">{p.Address}</p>
                      <p className="card-text">{p.ContactNo}</p>
                      <p className="card-text">{p.role}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };
    
    export default AllUsers;