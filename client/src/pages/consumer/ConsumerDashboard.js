import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import ConsumerMenu from '../../components/Layout/ConsumerMenu'

const ConsumerDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={'Consumer-Dashboard'}>
       <div className="container-fluid p-3 md-3">
        <div className="row">
            <div className="col-md-3">
                <ConsumerMenu/>
            </div>
            <div className="col-md-9">
              <div className="card w75 p-3">
                <h3>Consumer Name: {auth?.user?.username}</h3>
                <h3>Consumer Email: {auth?.user?.email}</h3>
                <h3>Consumer Address: {auth?.user?.Address}</h3>
                <h3>Consumer Contact: {auth?.user?.ContactNo}</h3>
              </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default ConsumerDashboard;