import React, { Component } from "react";
import NumberOfAVUsers from "./numberOfAVUsers";
import NumberOfConnectedAVs from "./numberOfConnectedAVs";
import ConnectedAVDetails from "./connectedAVDetails";
import '../styles/admin-dashboard.scss';
import '../styles/info-card.scss';

class AdminDashboard extends Component {
    state = {};
    render() {
        return (
            <div className='admin-container'>
                <div className='admin-heading'>
                    <h1 className="text-center" style={{ marginBottom: "25px" }}>
                        Admin Dashboard
                    </h1>
                </div>
                <div className='admin-content-container'>
                    <NumberOfAVUsers />
                    <NumberOfConnectedAVs/>
                    <ConnectedAVDetails/>
                </div>
                <div/>
            </div>
        );
    }
}

export default AdminDashboard;
