import React, {Component} from "react";

// import { getUserCount } from "../services/userService";

class CurrentLocation extends Component {
  state = {cL: "N/A"};

//   async componentDidMount() {
//     const { data: userCount } = await getUserCount();
//     this.setState({ userCount: userCount.count });
//   }

  render() {
    return (
      <div className='info-card'>
        <div className='label'>Current Location</div>
        <div className='value'>
          {this.props.data || 'Unknown'}
        </div>
      </div>
    );
  }
}

export default CurrentLocation;