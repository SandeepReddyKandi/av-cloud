import React from "react";
import {Link} from "react-router-dom";
import auth from "../services/authService";
import ListItemNavBar from "./common/listItemNavBar";
import "../styles/navbar.scss";

const NavBar = () => {
  const user = auth.getCurrentUser();

  return (
    <div id='navbar' className="navbar navbar-dark bg-dark flex-md-nowrap p-10 shadow navbar-expand-md bg-info">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        AV-CLOUD
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

        <ul className="navbar-nav px-3">
          {user && user.isadmin && (
            <ListItemNavBar
              iconClass="fa fa-bar-chart"
              label="Dashboard"
              path="/dashboard"
            />
          )}
          {user && !user.isadmin && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="Dashboard"
                path="/mystatus"
              />
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="My Plan"
                path="/myplan"
              />
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="View Rides History"
                path="/myRides"
              />
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="Schedule a Ride"
                path="/mySchedule"
              />
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="My Vehicles"
                path="/myVehicles"
              />
              
            </React.Fragment>
          )}
        </ul>
        <ul className="navbar-nav px-3 ml-auto">
          {!user && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Login"
                path="/login"
              />
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Register"
                path="/register"
              />
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-user-circle-o"
                label={"Welcome, " + user.name}
                path="/"
              />
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Log Out"
                path="/logout"
              />
            </React.Fragment>
          )}
        </ul>
    </div>
  );
};

export default NavBar;
