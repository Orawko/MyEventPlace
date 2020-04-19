import React, {Component} from "react";
import '../styles/popup.css';
import {confirmReservation, deleteReservation, editReservation} from '../helpers/rest';
import {adminEditReservation} from "../helpers/adminRest";
import {DateRange} from "react-date-range";
import {toMySqlDate} from "../helpers/methods";

export class BookPopUp extends Component {
    handleReturn = () => {
        this.props.back();
    };

    handleConfirm = () => {
        confirmReservation(this.props.data);
        this.props.back();
    };

    render() {
        const {roomNumber, dateStart, dateEnd} = this.props.data;
        return (
            <div className="popUp">
                <div className="popUpContent">
                    <h4>Do you want to confirm reservation?</h4>
                    <h4>{roomNumber} from: {dateStart.split("T")[0]} to: {dateEnd.split("T")[0]}</h4>
                    <br/>
                    <div id={'popupButtonsContainer'}>
                        <button className="confirm" onClick={this.handleConfirm}>
                            Confirm
                        </button>
                        <button className="back" onClick={this.handleReturn}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export class DeleteReservationPopUp extends Component {
    handleReturn = () => {
        this.props.back();
    };

    handleDelete = () => {
        deleteReservation(this.props.data);
        this.props.back();
    };

    render() {
        const {roomNumber, dateStart, dateEnd} = this.props.data;
        return (
            <div className="popUp">
                <div className="popUpContent">
                    <h4>Do you want to delete reservation?</h4>
                    <h4>{roomNumber} from: {dateStart.split("T")[0]} to: {dateEnd.split("T")[0]}?</h4>
                    <br/>
                    <div id={'popupButtonsContainer'}>
                        <button className="delete" onClick={this.handleDelete}>
                            Delete
                        </button>
                        <button className="back" onClick={this.handleReturn}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export class EditReservationPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
            dateStart: '2020-01-03',
            dateEnd: '2020-01-03'
        }
    }

    handleReturn = () => {
        this.props.back();
    };

    handleEdit = () => {
        const {idRooms, idReservations} = this.props.data;
        const {dateStart, dateEnd} = this.state;
        this.props.adminEdit ? adminEditReservation(idRooms, dateStart, dateEnd, idReservations)
            : editReservation(idRooms, dateStart, dateEnd, idReservations);
        this.props.back();
    };

    handleDateSelect(date) {
        const {startDate, endDate} = date.selection;

        this.setState(prevState => {
            let selectionRange = Object.assign({}, prevState.selectionRange);
            selectionRange.startDate = startDate;
            selectionRange.endDate = endDate;
            let sqlDateStart = toMySqlDate(startDate);
            let sqlDateEnd = toMySqlDate(endDate);
            return {selectionRange, dateStart: sqlDateStart, dateEnd: sqlDateEnd};
        })
    }

    render() {
        const {roomNumber} = this.props.data;
        return (
            <div className="popUp">
                <div className="popUpContent">
                    <div id={'dateRangeWrapper'}>
                        <DateRange
                            ranges={[this.state.selectionRange]}
                            onChange={(date) => {
                                this.handleDateSelect(date)
                            }}
                            rangeColors={["#39488b"]}
                            dateDisplayFormat={"yyyy-MM-dd"}
                        />
                    </div>
                    <div>
                        <br/>
                        <h4>Do you want to confirm new dates?</h4>
                        <h4>{roomNumber} from: {this.state.dateStart} to: {this.state.dateEnd}?</h4>
                        <br/>
                        <div id={'popupButtonsContainer'}>
                            <button className="confirm" onClick={this.handleEdit}>
                                Confirm new dates
                            </button>
                            <button className="back" onClick={this.handleReturn}>
                                Back
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}