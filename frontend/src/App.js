import React, { Component } from "react";
import NavBar from "./components/navBar";
import UserRoute from "./components/common/userRoute";
import AdminRoute from "./components/common/adminRoute";
import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import AddPlan from "./components/addPlan";
import MyPlan from "./components/myPlan";
import AdminDashboard from "./components/adminDashboard";
import UserDashboard from "./components/userDashboard";
import ScheduleRide from "./components/scheduleRide";
import VehicleList from "./components/vehicleList";
import AddVehicle from "./components/addVehicle";
import SensorInfo from "./components/sensorInfo";
import MyRides from "./components/myRides";
import DeleteVehicle from "./components/deleteVehicle";
import { socketUrl } from "./config.json";
import { getJwt } from "./services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
export const socket = io(socketUrl, {
  query: {
    jwtToken: getJwt(),
  },
});

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <main className='main-container'>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={Register}></Route>
            <UserRoute path="/myPlan/addPlan" component={AddPlan}></UserRoute>
            <UserRoute path="/myPlan" component={MyPlan}></UserRoute>
            <Route path="/myStatus" component={UserDashboard}></Route>
            <Route path="/mySchedule" component={ScheduleRide}></Route>
            <UserRoute
              path="/myVehicles/addVehicle"
              component={AddVehicle}
            ></UserRoute>
            <UserRoute path="/myVehicles" component={VehicleList}></UserRoute>
            <Route path="/sensorinfo" component={SensorInfo}></Route>
            <Route path="/myRides" component={MyRides}></Route>
            <UserRoute
              path="/deleteVehicle"
              component={DeleteVehicle}
            ></UserRoute>

            <Route
              path="/dashboard"
              component={AdminDashboard}
            ></Route>
            <Redirect from="/" exact to="/login"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
