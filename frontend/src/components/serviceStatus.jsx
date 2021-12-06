import React, {Component} from "react";
// import { getUserCount } from "../services/userService";
import {getSubscriptionData} from "../services/userService";

class ServiceState extends Component {
  state = {service: "Inactive"};

  async componentDidMount() {
    const { data: userCount } = await getSubscriptionData();
    // const result = userCount.filter(vservicestatus => vservicestatus);
    console.log("R1", userCount.current);
    if(userCount.current != 0)
    {
      const service = "Active"
      this.setState({service});
    }
    
  }

  render() {
      return (
          <div className='info-card'>
              <div className='label'>Service Status</div>
              <div className='value'>
                  {this.props.data || this.state.service}
              </div>
          </div>
      );
  }
}

export default ServiceState;