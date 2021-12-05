import React, {Component} from "react";
import withCardView from "./common/withCardView";
import {getLatestInfo} from "../services/sensorInfoService";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3900", {
//   query: {
//     jwtToken: getJwt(),
//   },
// });
//
// const avData1 = [
//   {
//     vC: "1",
//     vU: "2",
//     vA: "3",
//     vB: "3",
//     vD: "3",
//   },
// ];
//
// const avData2 = [
//   {
//     vC: "ON",
//     vU: "ON",
//     vA: "Activated",
//     vB: "32 psi",
//     vD: "32 psi",
//   },
// ];

class SensorInfo extends Component {
    state = {
        vehicle: "",
        map: "",
        simulationTime: "",
        speed: "",
        heading: "",
        location: "",
        gnss: "",
        height: "",
        client: "",
        city: "",
    };

    infoLabelMap = {
        Vehicle: 'vehicle',
        Map: 'map',
        'Simulation time': 'simulationTime',
        Speed: 'speed',
        Heading: 'heading',
        Location: 'location',
        GNSS: 'gnss',
        Height: 'height',
        Client: 'client',
        City: 'city',
    }

    columns = [
        { path: "Vehicle", label: "Vehicle" },
        { path: "Map", label: "Map" },
        { path: "Simulation Time", label: "Simulation Time" },
        { path: "GNSS", label: "GNSS data" },
        { path: "Speed", label: "Speed" },
        { path: "Heading", label: "Heading" },
        { path: "Location", label: "Simulation Time" },
        { path: "Height", label: "Height" },    // { path: "vD", label: "Vehicle Left Tire" },
    ];

    async componentDidMount() {
        await this.setTimer();
    }

    async componentWillUnmount () {
        this.clearTimer();
    };

    clearTimer() {
        return clearInterval(this.timer);
    }

    async setTimer() {
        await this.updateSensorInfoData();
        // socket.on("activeSensorInformation", this.reRenderAV);
        this.timer = setInterval(async () => {
            await this.updateSensorInfoData();
        }, 5000);
    }

    async updateSensorInfoData() {
        const {data: sensorInfo} = await getLatestInfo();
        if(sensorInfo.data && sensorInfo.data.vehicle) {
            const parsedState = {city: sensorInfo.data.city};
            sensorInfo.data.vehicle.map(info => {
                const [heading, ...rest] = info.split(':');
                if (heading && rest) {
                    const value = rest.join(':');
                    parsedState[this.infoLabelMap[heading]] = value.trim();
                }
            })
            this.setState({
                ...this.state,
                ...parsedState
            });
        } else {
            console.warn('Fetched info was empty');
        }
    }

    reRenderAV = (data) => {
        console.log("SOCKET INCOMING DATA: ", data);
        this.setState({
            tailight: data.tailight,
            headlight: data.headlight,
            temperature: data.temperature,
            vid: data.vid,
            gps: data.gps,
        });
        console.log("SET STATE", this.state.tailight);
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="text-center" style={{ marginBottom: "25px" }}>
                    Additional Sensor Information
                </h1>
                <div
                    className="dropdown-divider"
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        borderBlockColor: "#BEE5F0",
                    }}
                ></div>
                <h2
                    style={{
                        marginBottom: "50px",
                        marginTop: "50px",
                        marginLeft: "200px",
                        textAlign: "left",
                    }}>Vehicle : {this.state.vehicle}</h2>
                <div
                    className="dropdown-divider"
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        borderBlockColor: "#BEE5F0",
                    }}
                ></div>
                <h2
                    style={{
                        marginBottom: "50px",
                        marginTop: "50px",
                        marginLeft: "200px",
                        textAlign: "left",
                    }}>City : {this.state.city}</h2>
                <div
                    className="dropdown-divider"
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        borderBlockColor: "#BEE5F0",
                    }}
                ></div>

                <div
                    class="sensor"
                    style={{
                        marginBottom: "50px",
                        marginTop: "50px",
                        textAlign: "left",
                    }}
                ><h2
                    style={{
                        marginBottom: "50px",
                        marginTop: "50px",
                        marginLeft: "200px",
                    }}
                >Speed: {this.state.speed}
                </h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}
                    >Simulation Time: {this.state.simulationTime}
                    </h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}>Heading: {this.state.heading}</h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}>GNSS: {this.state.gnss}</h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}>Map: {this.state.map}</h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}>Height: {this.state.height}</h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}>Location: {this.state.location}</h2>
                    <div
                        className="dropdown-divider"
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderBlockColor: "#BEE5F0",
                        }}
                    ></div>
                    <h2
                        style={{
                            marginBottom: "50px",
                            marginTop: "50px",
                            marginLeft: "200px",
                            textAlign: "left",
                        }}>Client: {this.state.client}</h2>
                </div>


                {/* <Table data={this.state.data} columns={this.columns} keyAtt="headlight" ></Table> */}
            </React.Fragment>
        );
    }
}

//export default SensorInfo;

export default withCardView(SensorInfo);
