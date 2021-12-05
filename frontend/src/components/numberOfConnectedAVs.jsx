import React, {Component} from "react";
import {getAVCount} from "../services/avService";

class NumberOfConnectedAVs extends Component {
  state = {};

  async componentDidMount() {
    const { data: avCount } = await getAVCount();
    this.setState({ avCount: avCount.count });
  }

  render() {
      return (
          <div className='info-card'>
              <div className='label'>Number Of Connected AVs</div>
              <div className='value'>
                  {this.state.avCount}
              </div>
          </div>
      );
  }
}

export default NumberOfConnectedAVs;
