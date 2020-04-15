import React, {Component} from "react";
import '../styles/popup.css';
import {deleteReservation} from '../helpers/rest';

export class BookPopUp extends Component {
    handleReturn = () => {
        this.props.back();
    };

    handleConfirm = () => {
        this.props.confirm();
    };

    render() {
        return (
            <div className="popUp">
                <div className="popUpContent">
                    <h4>Do you want to confirm reservation?</h4>
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
    handleReturn = () => {
        this.props.back();
    };

    handleConfirm = () => {
        this.props.confirm();
        this.props.back();
    };

    render() {
        return (
            <div className="popUp">
                <div className="popUpContent">
                    <h4>Do you want to confirm reservation?</h4>
                    <br/>
                    <div id={'popupButtonsContainer'}>
                        <button className="confirm" onClick={this.handleConfirm}>
                            Confirm new dates
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