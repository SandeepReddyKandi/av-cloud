import React, { Component } from "react";
import CurrentState from "./currentState";
import ServiceState from "./serviceStatus";
import CurrentLocation from "./currentLocation";
import RoadService from "./roadService";
import VehicleId from "./vehicleId";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import { socket } from "../App";
import '../styles/user-dashboard.scss';

// import { getJwt } from "../services/authService";
import { getAvStates } from "../services/avService";
import {getRides, getVehicles} from "../services/userService";

import _ from "lodash";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3900", {
//   query: {
//     jwtToken: getJwt(),
//   },
// });

const user = auth.getCurrentUser();
// let user1 = user.name.slice(0,1).toUpperCase() + user.name.slice(1,user.name.length);
let user1 = "";
if (user != null) {
  user1 =
    user.name.slice(0, 1).toUpperCase() + user.name.slice(1, user.name.length);
}

class UserDashboard extends Component {
  state = {
    currentState: "",
    serviceState: "",
    currentLocation: "",
    roadService: "",
    vid: "",
  };

  async componentDidMount() {
    //this.populateAVStatusListData();
    console.log("MADE IT TO SOCKET");
    socket.on("activeVehicleData", this.reRenderAV);
    socket.on("activeSensorInformation", this.reRenderAV1);
    console.log("MADE IT PAS SOCKET");

    const { data: getV } = await getVehicles();
    const { data: getR } = await getRides();
    this.setState({getV});
    console.log("THIS: ", getV);
    console.log("This: get Rides ", getR);
  }

  async populateAVStatusListData() {
    const { data: avStatus } = await getAvStates();
    console.log("MADE ", avStatus);
    // const avStatusd = [];
    // avStatus.map((item) => {
    //     avStatusd.push({
    //     state: item.state,
    //   });
    // });
    console.log("MADE ", avStatus);
    this.setState(avStatus);
    // const avState = await getAvStates();
    // console.log("LIST DATA: ", avStatus);
    // this.setState({ avStatus });
  }

   reRenderAV = (data) => {
    console.log("SOCKET INCOMING DATA: ", data);
    this.setState({
      currentState: data.currentState,
      serviceState: data.serviceState,
      roadService: data.roadService,
      vid: data.vid,
    });
    
    console.log("Populating count data");
  };

  reRenderAV1 = (data) => {
    console.log("SOCKET INCOMING DATA1: ", data);
    this.setState({ currentLocation: data.currentLocation, 
            vid: data.vid, });
    const index = _.findIndex(this.state.getV, (v) => {
        
        return (v.vId == data.vId)
    })
    console.log(index)
    this.setState({
        currentState: this.state.getV[index].currentState,
        serviceState: this.state.getV[index].serviceState,
        roadService: this.state.getV[index].roadService,
        vid: this.state.getV[index].vid,
      });
    console.log("Populating count data");
  };

  render() {
    return (
      <div className='user-container'>
          <div className='user-heading'>
              <h1 className="text-center">
                  {user1}'s Dashboard
              </h1>
          </div>
          <div className='link-container'>
              <Link className="btn btn-info" to={{pathname: "/sensorinfo",}}>
                  Additional Sensor Info
              </Link>
          </div>
          <div className='user-content-container'>
              <VehicleId data={this.state.vid}/>
              <CurrentState data={this.state.getV && this.state.getV.length ? 'Moving': 'Idle'}/>
              <ServiceState data={this.state.getV && this.state.getV.length ? 'Active' : 'Inactive'}/>
              <CurrentLocation data={this.state.currentLocation}/>
              <RoadService data={this.state.roadService}/>
          </div>

      </div>
    );
  }
}

export default UserDashboard;
