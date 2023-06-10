import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const AdSingleTender = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [tender, setTender] = useState([]);
  const [auth, setAuth] = useAuth();
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [dshow, setDShow] = useState(false);

  useEffect(() => {
    if (auth.user.role === 'Contractor' || auth.user.role === 'Admin') {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user.role === 'Consumer' || auth.user.role === 'Admin') {
      setCShow(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user.role === 'Admin') {
      setDShow(true);
    }
  }, []);

  const handleUpdate = async () => {
    const body = {
      title: title,
      details: details,
      budget: budget,
    };
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.put(`/api/tender/updateTender/${params.id}`, body, { headers });
      console.log(res);
      setDShow(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in updating the tender');
    }
  };

  const getSingleTender = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get(`/api/tender/find/${params.id}`, { headers });
      console.log(data);
      setTender(data?.tender);
      console.log(data, 'hellooojoadjlojadkljlkad');
    } catch (error) {
      toast.error('Something went wrong in getting the tender');
     return console.log(error);
      
    }
  };

  useEffect(() => {
    getSingleTender();
  }, []);

  const handleDelete = async () => {
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.delete(`/api/tender/deleteTender/${params.id}`, { headers });
      console.log(res);
     
        toast.success(`tender is deleted`);
      setDShow(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in deleting the tender');
    }
  };
  const handleInactive = async () => {
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.put(`/api/tender/updateTenderStatus/${params.id}`, { headers });
      console.log(res);
      setDShow(true);
      toast.success("Tender Inactive")
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in deleting the tender');
    }
  };

  const handleLowest = async () => {
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const { data } = await axios.get(`/api/bid/lowest/${params.id}`, { headers });
      console.log(data, 'MY DATAAA');
      const mappedBids = data.map((item) => ({
        amount: item.amount,
        companyname: item.user.companyName,
        username: item.user.username,
        email: item.user.email,
      }));
      setBids(mappedBids);
      setAShow(true);
    } catch (error) {
      toast.error('Something went wrong in getting the lowest bids')
      return console.log(error)
    }
  };

  useEffect(() => {
    console.log(bids, 'Hellooo');
  }, [bids]);

  const handleBid = async () => {
    const body = {
      user: `${auth.user._id}`,
      tender: `${params.id}`,
      amount: `${bid}`,
    };
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.post(`/api/bid/createBid`, body, { headers });
      console.log(res);
      setShow(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in creating the bid');
    }
  };

  return (
    <Layout title="Tenders">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Single Tender</h1>
          <div className="row">
            <div className="col-md-6">
           
              <img
                style={{ width: '100%' }}
                src="/images/hammer.jpg"
                className="card-img-top"
                alt={tender.name}
              />
            </div>
            <div className="col-md-6">
            
              <div className="card-body" key={tender._id}>
                <h5 className="card-title">Tender Title: {tender.title}</h5>
                <p className="card-text">Tender Description: {tender.categories}</p>
                <p className="card-text">Tender Description: {tender.details}</p>
                <p className="card-text">Tender Budget: {tender.budget}</p>
                <p className="card-text">Tender Username: {tender?.user?.username}</p>
                <p className="card-text">Tender Status: {tender?.status}</p>
                {show && (
                  <div className="mt-3">
                    <input
                      type="number"
                      value={bid}
                      placeholder="Bid now"
                      className="form-control"
                      onChange={(e) => setBid(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2" onClick={handleBid}>
                      Bid
                    </button>
                  </div>
                )}
          {dshow && (
            <div className="delete-tender-container mt-4">
              
              <NavLink to="/dashboard/admin/categories">
                
                <button className="btn btn-secondary mt-3" onClick={handleDelete}>
                  Delete this Tender 
                </button>
              </NavLink>
            </div>
          )}
           {dshow && (
            <div className="update-tender-container mt-4">
              
              <NavLink to="/dashboard/admin/Tenders">
                
                <button className="btn btn-secondary mt-3" onClick={handleInactive}>
                  Inactive Tender 
                </button>
              </NavLink>
            </div>
          )}
                
                {Cshow && (
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleLowest}>
                      3 Lowest Bids
                    </button>
                    {Ashow && (
                      <div className="mt-3">
                        {bids.map((p, index) => (
                          <div className="card mb-3" key={index}>
                            <div className="card-body">
                              <h5 className="card-title">Bid by: {p.username}</h5>
                              <p className="card-text">Email: {p.email}</p>
                              <p className="card-text">Company Name: {p.companyname}</p>
                              <p className="card-text">Amount: {p.amount}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {dshow && (
            
              <Link  key={tender._id}
              to={`/dashboard/admin/UpdateTender/${tender._id}`}
              className="product-link">
                <button className="btn btn-primary mt-2" >
                  Update Tender
                </button>
              </Link>
            
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdSingleTender;
