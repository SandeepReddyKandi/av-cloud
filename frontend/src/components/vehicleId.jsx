import React, {Component} from "react";

class VehicleId extends Component {
    state = { vid: "N/A",
      };

      columns = [
        { path: "vid", label: "Vehicle License Plate" },
      ];

  render() {
    return (
      <div className='info-card'>
        <div className='label'>Vehicle License Plate </div>
        <div className='value'>
            {this.props.data || this.state.vid}
        </div>
      </div>
    );
  }
}

export default VehicleId;