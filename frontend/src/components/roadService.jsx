import React, {Component} from "react";

// import { getUserCount } from "../services/userService";

class RoadService extends Component {
  state = {rS: 'None'};

//   async componentDidMount() {
//     const { data: userCount } = await getUserCount();
//     this.setState({ userCount: userCount.count });
//   }

  render() {
    return (
      <div className='info-card'>
          <div className='label'>Road Service</div>
          <div className='value'>
              {this.props.data || 'No Service'}
          </div>
      </div>
    );
  }
}

export default RoadService;