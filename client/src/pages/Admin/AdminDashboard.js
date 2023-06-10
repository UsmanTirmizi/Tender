import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/Layout/AdminMenu'
const AdminDashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title="Dashboard-Admin">
      <div className="container-fluid mb-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
           </div>
        < div className="col-md-9">
        <div className="card w75 p-3">
           <h3>ADMIN PANEL</h3>
          <h3>Admin Name: {auth?.user?.username} </h3>
          <h3>Admin Email: {auth?.user?.email} </h3>
          <h3>Admin Contact: {auth?.user?.ContactNo} </h3>
        </div>
        </div>
       
        </div>
      </div>
        <h1>AdminDashboard</h1>
    </Layout>
  )
}

export default AdminDashboard