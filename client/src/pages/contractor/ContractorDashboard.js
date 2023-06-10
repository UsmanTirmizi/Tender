import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import ContractorMenu from '../../components/Layout/ContractorMenu'

const ContractorDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={'Contractor-Dashboard'}>
       <div className="container-fluid p-3 md-3">
        <div className="row">
            <div className="col-md-3">
                <ContractorMenu/>
            </div>
            <div className="col-md-9">
              <div className="card w75 p-3">
                <h3>Contractor Name: {auth?.user?.username}</h3>
                <h3>Contractor Email: {auth?.user?.email}</h3>
                <h3>Contractor Address: {auth?.user?.Address}</h3>
                <h3>Contractor Contact: {auth?.user?.ContactNo}</h3>
              </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default ContractorDashboard;