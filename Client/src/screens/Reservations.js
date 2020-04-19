import React, {Component} from 'react'
import ResultList from '../components/list';
import {DeleteReservationPopUp, EditReservationPopUp,} from '../components/popups';
import {getMyReservations} from '../helpers/rest';
import ScreenHeader from "../components/header";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            reservationToChange: {},
            switchPopUp: null
        };
    }

    componentDidMount() {
        this.updateReservations();
    }

    getReservationToChangeData = (reservationData, popUpType) => {
        console.log(reservationData);
        this.setState({
            switchPopUp: popUpType,
            reservationToChange: reservationData
        });
    };

    closePopup = () => {
        this.setState({
            switchPopUp: null,
            reservationToChange: {}
        });
        this.updateReservations();
    };

    updateReservations = () => {
        getMyReservations().then(data => {
            this.setState({reservations: data})
        });
    };

    renderPopUp = (status) => {
        switch (status) {
            case 'delete':
                return <DeleteReservationPopUp confirm={this.getReservationToChangeData} back={this.closePopup}
                                               data={this.state.reservationToChange}/>;
            case 'edit':
                return <EditReservationPopUp back={this.closePopup} data={this.state.reservationToChange}
                                             adminEdit={false}/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <div id={'main'}>
                <div id={'container'}>
                    <ScreenHeader {...this.props}/>
                    <div id={'reservationList'}>
                        <ResultList data={this.state.reservations} myReservations={true}
                                    getItemData={this.getReservationToChangeData}/>
                    </div>
                    {this.renderPopUp(this.state.switchPopUp)}
                </div>
            </div>
        );
    }
}

export default Reservations;