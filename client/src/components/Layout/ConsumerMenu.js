import React from "react";
import { NavLink } from "react-router-dom";
const ConsumerMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Consumer Panel</h4>
          <NavLink
            to="/dashboard/consumer/createTenders"
            className="list-group-item list-group-item-action"
          >
            Create Tender
          </NavLink>
        
          <NavLink
            to="/dashboard/consumer/categories"
            className="list-group-item list-group-item-action"
          >
            Categories
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink> */}
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

export default ConsumerMenu;