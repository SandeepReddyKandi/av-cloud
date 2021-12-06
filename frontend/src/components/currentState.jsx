import React, {Component} from "react";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3900", {
//   query: {
//     jwtToken: getJwt(),
//   },
// });


class CurrentState extends Component {
    state = { current: "active",
      };

      columns = [
        { path: "state", label: "Status" },
      ];

// componentDidMount() {
//     //this.populateAVStatusAndCountData();
//     this.populateAVStatusListData();
//     socket.on("avStateUpdated", this.reRenderAV);
//   }

//   async populateAVStatusAndCountData() {
//     console.log("In data");
//     const { data: avStates } = await getAvStates();
//     console.log("AV STATES: ", avStates);
//     const avStatusDistributionData = [];
//     avStates.map((item) => {
//       avStatusDistributionData.push({
//         vId: item.vId,  
//         state: item.state,
//       });
//     });
//     this.setState({ avStatusDistributionData });
//     console.log("populated Count data");
// }
// async populateAVStatusListData() {
//     const { data: avStatus } = await getAvStates();
//     console.log("LIST DATA: ", avStatus);
//     // this.setState({ avStatus });
//     const avStatusDistributionData= [];
//     avStatus.map((item) => {
//         avStatusDistributionData.push({
//           state: item.state,
//         });
//     });
//     this.setState({ avStatusDistributionData });
//   }

//   reRenderAV = (data) => {
//     const avStates = this.state.avStatusDistributionData;
//     // _.remove(avStates, (avStatus) => {
//     //     return avStatus.number == data.number;
//     //   });
//     console.log("SOCKET INCOMING DATA: ", data);
//     avStates.push(data);
//     // this.setState({ avStates });
//     console.log("Populating count data");
//     //this.populateAVStatusAndCountData();
//   };


//   async componentDidMount() {
//     const { data: userCount } = await getUserCount();
//     this.setState({ userCount: userCount.count });
//   }

  render() {
    return (
      <div className='info-card'>
        <div className='label'>Current State</div>
        <div className='value'>
            {this.props.data}
        </div>
      </div>
    );
  }
}

export default CurrentState;