import React, {Component} from "react";
import {getLatestInfo} from "../services/sensorInfoService";
import '../styles/sensor-info.scss';
import '../styles/info-card.scss';

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
            <div className='sensor-info-container'>
                <div className='sensor-info-heading'>
                    <h1>
                        Additional Sensor Information
                    </h1>
                </div>
                <div className='sensor-info-content-container'>
                    <div className='info-card'>
                        <div className='label'>Vehicle</div>
                        <div className='value'> {this.state.vehicle}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>City</div>
                        <div className='value'> {this.state.city}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Speed</div>
                        <div className='value'> {this.state.speed}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Simulation Time</div>
                        <div className='value'> {this.state.simulationTime}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Heading</div>
                        <div className='value'> {this.state.heading}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>GNSS</div>
                        <div className='value'> {this.state.gnss}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Map</div>
                        <div className='value'> {this.state.map}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Height</div>
                        <div className='value'> {this.state.height}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Location</div>
                        <div className='value'> {this.state.location}</div>
                    </div>
                    <div className='info-card'>
                        <div className='label'>Client</div>
                        <div className='value'> {this.state.client}</div>
                    </div>
                </div>
            </div>
        );
    }
}

//export default SensorInfo;

export default SensorInfo;
