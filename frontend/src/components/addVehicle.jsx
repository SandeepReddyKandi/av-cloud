import React from "react";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import {addVehicle, getSubscriptionData} from "../services/userService";
import '../styles/add-vehicle.scss'

const user = auth.getCurrentUser();

class AddVehicle extends Form {
  state = {
    data: {vId: "", vColor: "", vMake: "", vModel: "", vMileage: "", vPspace: "", vLocation: "",},
    errors: {},
  };

  schema = {
    vId: Joi.string().required().label("Vehicle ID"),
    vColor: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Color"),
    vMake: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Make"),
    vModel: Joi.string().required().label("Vehicle Model"),
    vMileage: Joi.number().integer().min(0).max(200000).label("Vehicle Mileage"),
    vPspace: Joi.number().integer().min(0).max(8).label("Vehicle Passenger Space"),
    // vServiceStatus: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Service Status"),
    // vCurrentStatus: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Current Status"),
    vLocation: Joi.string().required().label("Vehicle Current Location"),
    // vRoadService: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Road Service"),
  };
  // adding
  doSubmit = async () => {

    try {
      console.log("Submitted");
      const {
        vId, vColor, vMake, vModel, vMileage, vPspace, vCurrentStatus, vServiceStatus,
        vLocation, vRoadService,
      } = this.state.data;
      // const { paymentType } = this.state.data;
      const vehicleData = {
        vId,
        vColor,
        vMake,
        vModel,
        vMileage,
        vPspace,
        vServiceStatus,
        vCurrentStatus,
        vLocation,
        vRoadService,
      };
      vehicleData.vCurrentStatus = "Idle";
      const {data: planDetails} = await getSubscriptionData();
      console.log("DATA: ", planDetails);
      if (planDetails.current.length == 0) {
        vehicleData.vServiceStatus = "Inactive";
      } else {
        vehicleData.vServiceStatus = "Active";
      }
      vehicleData.vRoadService = "No Service";

      console.log(this.state.data);
      console.log("Submitted1");
      console.log(vehicleData);
      console.log("Submitted2");

      await addVehicle(vehicleData);
      this.props.history.push("/myVehicles");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("CAUGHT HERE");
        const errors = this.state.errors;
        errors.vId = ex.response.data;
        this.setState({errors});
      }
    }

  };


  render() {
    // const user = auth.getCurrentUser();
    return (
        <div className='add-vehicle-form-container'>
          <div className='add-vehicle-content'>
            <div className='form-container'>
              <h1 className="text-center">Add a vehicle</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("vId", "VID")}
                {this.renderInput("vColor", "Vehicle Color")}
                {this.renderInput("vMake", "Vehicle Make")}
                {this.renderInput("vModel", "Vehicle Model")}
                {this.renderInput("vMileage", "Vehicle Mileage")}
                {this.renderInput("vPspace", "Vehicle Passengers Space")}
                {this.renderInput("vLocation", "Vehicle Location (City)")}
                <div className='button-cont d-flx justify-content-center'>
                  {this.renderButton("Submit")}
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default AddVehicle;