import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from './../../components/Layout/Layout';
import ContractorMenu from '../../components/Layout/ContractorMenu';

const BiddedTender = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [tender, setTender] = useState([]);
  const [auth, setAuth] = useAuth();
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);
  






  const getSingleTender = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get(`/api/bid/findBid/${params.id}`, { headers });
      console.log(data);
      setBid(data?.bid);
      console.log(data, 'hellooojoadjlojadkljlkad');
    } catch (error) {
      toast.error('Something went wrong in getting the tender');
     return console.log(error);
      
    }
  };

  useEffect(() => {
    getSingleTender();
  }, []);


  useEffect(() => {
    console.log(bids, 'Hellooo');
  }, [bids]);

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
            
              <div className="card-body" key={bid._id}>
                <h5 className="card-title">Tender Title: {bid?.tender?.title}</h5>
                <p className="card-text">Tender Category: {bid?.tender?.categories}</p>
                <p className="card-text">Tender Description: {bid?.tender?.details}</p>
                <p className="card-text">Tender Budget: {bid?.tender?.budget}</p>
                <p className="card-text">Tender created by: {bid?.user?.username}</p>
                <p className="card-text">Your Bid: {bid?.amount}</p>
                
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default BiddedTender;