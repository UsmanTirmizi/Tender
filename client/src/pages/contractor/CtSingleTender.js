import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from './../../components/Layout/Layout';
import ContractorMenu from '../../components/Layout/ContractorMenu';

const CtSingleTender = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [tender, setTender] = useState([]);
  const [auth, setAuth] = useAuth();
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);
  const [status,setStatus]=useState("")


  useEffect(() => {
    if (auth.user.role === 'Contractor' || auth.user.role === 'Admin') 
    {
          setShow(true);
    }
  }, []);


  useEffect(() => {
    if (auth.user.role === 'Consumer' || auth.user.role === 'Admin') {
      setCShow(true);
    }
  }, []);



  const getSingleTender = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get(`/api/tender/find/${params.id}`, { headers });
      console.log(data);
      setTender(data?.tender);
      console.log(data, 'hellooojoadjlojadkljlkad');
      if(data?.tender?.status==="ACTIVE")
      {
          setShow(true);
      }
      if(data?.tender?.status==="INACTIVE"){
        setShow(false)
      }
    } catch (error) {
      toast.error('Something went wrong in getting the tender');
     return console.log(error);
      
    }
  };

  useEffect(() => {
    getSingleTender();
    console.log(tender,"Sumair")
  }, []);


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
          <ContractorMenu />
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
                {(show===true) && (
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
                
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default CtSingleTender;