import React from "react";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import {deleteVehicle} from "../services/userService";
import '../styles/vehicle-form.scss';

const user = auth.getCurrentUser();

class DeleteVehicle extends Form {
    state = {
        data: { vId: ""},
        errors: {},
    };

    schema = {
        vId: Joi.string().required().label("Vehicle ID"),
      };
  

  doSubmit = async () => {

    try{
      console.log("Submitted");
      const { vId } = this.state.data;
      // const { paymentType } = this.state.data;
      const vehicleId = {
        vId
      };
    
      await deleteVehicle(vehicleId);
      this.props.history.push("/myVehicles");
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = this.state.errors;
        errors.vId = ex.response.data;
        this.setState({ errors });
      }
    }
  };
// async componentDidMount() {
// 	const { data: vehicles } = await getVehicles();
//     var vIds = vehicles.map(function (f) {
//         return f.vId
//       });
//     console.log(vIds);
//     this.setState({
// 		vId: vIds
// 	});
// }

  render() {
    // const user = auth.getCurrentUser();

    return(
        <div className='vehicle-form-container'>
            <div className='vehicle-content'>
                <div className='form-container'>
                    <h1 className="text-center"> Delete a Vehicle</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("vId", "VID")}
                        <div className='button-cont d-flx justify-content-center'>
                            {this.renderButton("Submit")}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )}
}

export default DeleteVehicle;