import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            View All Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/CreateTenders"
            className="list-group-item list-group-item-action"
          >
            Create Tenders
          </NavLink>
          <NavLink
            to="/dashboard/admin/Tenders"
            className="list-group-item list-group-item-action"
          >
            All Tenders
          </NavLink>
          <NavLink
            to="/dashboard/admin/categories"
            className="list-group-item list-group-item-action"
          >
            Categories
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;