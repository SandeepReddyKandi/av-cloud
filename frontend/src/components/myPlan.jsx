import React, {Component} from "react";
import CurrentPlan from "./currentPlan";
import PastPlans from "./pastPlans";
import FuturePlan from "./futurePlan";
import {getSubscriptionData} from "../services/userService";
import {Link} from "react-router-dom";

class MyPlan extends Component {
  state = {};

  async componentDidMount() {
    const { data: planDetails } = await getSubscriptionData();
    console.log("DATA: ", planDetails);
    this.setState({
      futurePlans: planDetails.future,
      currentPlan: planDetails.current,
      pastPlans: planDetails.past,
    });
  }

    render() {
        return (
            <div className='user-container'>
                <div className='user-heading'>
                    <h1 className="text-center" style={{marginBottom: "25px"}}>
                        My Plans
                    </h1>
                </div>
                <div className='link-container'>
                    <Link className="btn btn-info" to={{
                        pathname: "/myPlan/addPlan",
                        state: {
                            futurePlans: this.state.futurePlans,
                            currentPlan: this.state.currentPlan,
                        }
                    }}>
                        Add Plan
                    </Link>
                </div>
                <div className='user-content-container'>
                    <FuturePlan data={this.state.futurePlans}/>
                    <CurrentPlan data={this.state.currentPlan}/>
                    <PastPlans data={this.state.pastPlans}/>
                </div>
            </div>
        );
    }
}

export default MyPlan;
