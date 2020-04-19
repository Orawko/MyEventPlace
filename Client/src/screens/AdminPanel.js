import React, {Component} from 'react';
import '../styles/AdminPanel.css';
import {getAcceptedReservations, getPendingReservations, getUsers} from "../helpers/adminRest";
import {AcceptedReservations, PendingReservations, UsersList} from "../components/adminDataLists"
import {EditReservationPopUp} from "../components/popups";

export default class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            pendingReservations: [],
            acceptedReservations: [],
            showPopup: false,
            editedRoomData: {}
        };

        this.updateData();
    }

    updateData = () => {
        getPendingReservations().then(data => {
            this.setState({pendingReservations: data})
        });
        getAcceptedReservations().then(data => {
            this.setState({acceptedReservations: data})
        });
        getUsers().then(data => {
            this.setState({usersData: data})
        });
    };

    closePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    };

    getReservationData = (reservationData) => {
        console.log(reservationData);
        this.setState({
            showPopup: !this.state.showPopup,
            editedRoomData: reservationData
        });
    };

    render() {
        return (
            <div id={'main'}>
                <div id={'container'}>
                    {this.state.usersData.length > 0 ?
                        <React.Fragment>
                            <div className={'adminHeader'}>
                                <h2>Admin panel</h2>
                                <h2 id={'logout'} onClick={() => this.props.logout()}>
                                    <i className={'icon-logout'}/></h2>
                                <button id={"bookButton"} onClick={this.updateData}>Refresh</button>
                            </div>
                            <div className={'adminDataContainer'}>
                                <h2 className={'adminDataHeader'}>Pending reservations</h2>
                                <PendingReservations data={this.state.pendingReservations}/>
                            </div>
                            <div className={'adminDataContainer'}>
                                <h2 className={'adminDataHeader'}>Accepted reservations</h2>
                                <AcceptedReservations data={this.state.acceptedReservations}
                                                      getReservationData={this.getReservationData}/>
                            </div>
                            <div className={'adminDataContainer'}>
                                <h2 className={'adminDataHeader'}>Users</h2>
                                <UsersList data={this.state.usersData}/>
                            </div>
                        </React.Fragment> : <h2>Data is loading...</h2>}
                    {this.state.showPopup ?
                        <EditReservationPopUp back={this.closePopup} data={this.state.editedRoomData}
                                              adminEdit={true}/> : null}
                </div>
            </div>
        );
    }
}