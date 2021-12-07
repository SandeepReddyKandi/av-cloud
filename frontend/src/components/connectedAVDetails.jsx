import React, { Component } from "react";
import _ from "lodash";

import StatesOfConnectedAVs from "./statesOfConnectedAVs";
import ListOfConnectedAVs from "./listOfConnectedAVs";

import { getAVStateAndCount, getListOfAVs } from "../services/avService";
import { getJwt } from "../services/authService";
import { socket } from "../App";


class ConnectedAVDetails extends Component {
  state = {
    avStatusDistributionData: [],
    avStatusList: [],
  };

  color = ["#E38627", "#C13C37", "#6A2135"];

  componentDidMount() {
    this.populateAVStatusAndCountData();
    this.populateAVStatusListData();
    socket.on("avStatusUpdated", this.reRenderAVList);
  }

  async populateAVStatusAndCountData() {
    const { data: avStates } = await getAVStateAndCount();
    console.log("AV STATES: ", avStates);
    const avStatusDistributionData = [];
    let count = 0;
    avStates.map((item) => {
      avStatusDistributionData.push({
        state: item.state,
        value: item.count,
        color: this.color[count],
      });
      count += 1;
    });
    this.setState({ avStatusDistributionData });
    console.log("populated Count data");
  }

  async populateAVStatusListData() {
    const { data: avStatusList } = await getListOfAVs();
    //console.log("LIST DATA: ", avStatusList);
    this.setState({ avStatusList });
  }

  reRenderAVList = (data) => {
    const avStatusList = this.state.avStatusList;

    const index = _.findIndex(avStatusList, (avStatus) => {
      return avStatus.vid == data.vid;
    });
    // _.remove(avStatusList, (avStatus) => {
    //   return avStatus.vid == data.vid;
    // });

    console.log("INDEX: ", index);
    if (index >= 0) {
      const record = avStatusList[index];
      _.remove(avStatusList, (avStatus) => {
        return avStatus.vid == data.vid;
      });
      record.vcurrentstatus = data.vcurrentstatus;
      avStatusList.unshift(record);
    }
    this.setState({ avStatusList });
    console.log("SOCKET INCOMING DATA: ", data);
    console.log("AVStatusList: ", avStatusList);
    // avStatusList.unshift(data);
    // console.log("AVStatusList: ", avStatusList);
    // this.setState({ avStatusList });
    // console.log("Populating count data");
    // this.populateAVStatusAndCountData();
  };

  render() {
    return (
        <>
          <div className='h100'>
            <div className='d-flx h100'>
              <div className='flx-1'>
                <StatesOfConnectedAVs
                    style={{
                      margin: "30px 10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                    data={this.state.avStatusDistributionData}
                />
              </div>
            </div>
          </div>
          <div className='h100'>
            <div className='d-flx h100'>
              <div className='flx-1'>
                <ListOfConnectedAVs
                    style={{
                      margin: "30px 10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                    data={this.state.avStatusList}
                />
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default ConnectedAVDetails;
