import React from "react";
import { NavLink } from "react-router-dom";
const ContractorMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Consumer Panel</h4>
          
          <NavLink
            to="/dashboard/contractor/myBids"
            className="list-group-item list-group-item-action"
          >
            MyBids
          </NavLink>
          <NavLink
            to="/dashboard/contractor/categories"
            className="list-group-item list-group-item-action"
          >
            Categories
          </NavLink>
          {/* <NavLink
            to="/dashboard/consumer/myTenders"
            className="list-group-item list-group-item-action"
          >
            My Tenders
          </NavLink> */}
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

export default ContractorMenu;