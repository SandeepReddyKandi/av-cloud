import React, {Component} from "react";
import {getUserCount} from "../services/userService";

class NumberOfAVUsers extends Component {
  state = {};

  async componentDidMount() {
    const { data: userCount } = await getUserCount();
    this.setState({ userCount: userCount.count });
  }

  render() {
    return (
      <div className='info-card'>
        <div className='label'> Number Of AV Users</div>
        <div className='value'>
          {this.state.userCount}
        </div>
      </div>
    );
  }
}

export default NumberOfAVUsers;
