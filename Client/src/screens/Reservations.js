import React, {Component} from 'react'
import Line from "../components/line";
import ResultList from '../components/list';
import {DeleteReservationPopUp, EditReservationPopUp} from '../components/popups';

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
        this.getMyReservations()
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
        this.getMyReservations()
    };

    renderPopUp = (status) => {
        switch (status) {
            case 'delete':
                return <DeleteReservationPopUp confirm={this.getReservationToChangeData} back={this.closePopup}
                                               data={this.state.reservationToChange}/>;
            case 'edit':
                return <EditReservationPopUp back={this.closePopup} data={this.state.reservationToChange}/>;
            default:
                return null;
        }
    };

    getMyReservations() {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `${localStorage.getItem('jwt')}`
            }
        };
        fetch(`http://localhost:3000/user`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.length > 0) {
                    this.setState({
                        reservations: data
                    }, () => {
                        console.log(this.state)
                    });
                } else {
                }
            })
            .catch(() => alert(`Error occurred! try later or login again`))
    }

    render() {
        return (
            <div id={'main'}>
                <div id={'container'}>
                    <div id={'homeHeader'}>
                        <div id={'homeLogo'}>
                            <img src={require('../images/horizontal.png')} alt="My event place"/>
                        </div>
                        <Line color="white" height={1}/>
                        <div id={"homeNavButtons"}>
                            <h2 className={'navButtonText'} onClick={() => {
                                this.props.setScreen("search")
                            }}>Find place </h2>
                            <h2 className={'navButtonHighlighted'} onClick={() => {
                                this.props.setScreen("reservations")
                            }}>My reservations</h2>
                        </div>
                    </div>
                    <div id={'reservationList'}>
                        <ResultList data={this.state.reservations} myReservations={true}
                                    showPopup={this.getReservationToChangeData}/>
                    </div>
                    {this.renderPopUp(this.state.switchPopUp)}
                </div>
            </div>
        );
    }
}

export default Reservations;