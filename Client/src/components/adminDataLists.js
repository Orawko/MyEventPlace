import React, {Component} from 'react';
import Line from "./line";
import {acceptReservation, deleteReservation, deleteUser} from "../helpers/adminRest";

const PendingElement = ({singleData}) => {
    const {idReservations, roomNumber, dateStart, dateEnd, price} = singleData;
    return <li key={singleData.idReservation}>
        <div className={'adminListItem'}>
            <table className={'dataTable'}>
                <tr>
                    <th>{idReservations}</th>
                    <th>{roomNumber}</th>
                    <th>{dateStart}</th>
                    <th>{dateEnd}</th>
                    <th>${price}</th>
                </tr>
            </table>
            <div id={'popupsButtonContainer'}>
                <button id={'bookButton'} onClick={() => {
                    acceptReservation(idReservations)
                }}>Accept
                </button>
                <button className={'deleteButton'} onClick={() => {
                    deleteReservation(idReservations)
                }}>Decline
                </button>
            </div>
        </div>
        <Line color={'#39488b'} height={1}/>
    </li>
};

export class PendingReservations extends Component {
    render() {
        const {data} = this.props;
        return <ul id={'roomsList'}>
            {data.length > 0 ? <Line color={'#39488b'} height={1}/> : null}
            {data.map(item => {
                return <PendingElement singleData={item}/>
            })}
        </ul>
    }
}

const AcceptedElement = ({singleData, getReservationData}) => {
    const {idReservations, roomNumber, dateStart, dateEnd, price} = singleData;
    return <li key={singleData.idReservation}>
        <div className={'adminListItem'}>
            <table className={'dataTable'}>
                <tr>
                    <th>{idReservations}</th>
                    <th>{roomNumber}</th>
                    <th>{dateStart}</th>
                    <th>{dateEnd}</th>
                    <th>${price}</th>
                </tr>
            </table>
            <div id={'popupsButtonContainer'}>
                <button id={'bookButton'} onClick={() => {
                    getReservationData(singleData)
                }}>Edit
                </button>
                <button className={'deleteButton'} onClick={() => {
                    deleteReservation(idReservations)
                }}>Delete
                </button>
            </div>
        </div>
        <Line color={'#39488b'} height={1}/>
    </li>
};

export class AcceptedReservations extends Component {
    render() {
        const {data, getReservationData} = this.props;
        return <ul id={'roomsList'}>
            {data.length > 0 ? <Line color={'#39488b'} height={1}/> : null}
            {data.map(item => {
                return <AcceptedElement singleData={item} getReservationData={getReservationData}/>
            })}
        </ul>
    }
}

const UsersElement = ({singleData}) => {
    const {idUsers, name, surname, email, phone} = singleData;
    return <li key={singleData.idUsers}>
        <div className={'adminListItem'}>
            <table className={'dataTable'}>
                <tr>
                    <th>{idUsers}</th>
                    <th>{surname}</th>
                    <th>{name}</th>
                    <th>{email}</th>
                    <th>{phone}</th>
                </tr>
            </table>
            <div id={'popupsButtonContainer'}>
                <button className={'deleteButton'} onClick={() => {
                    deleteUser(idUsers);
                }}>Delete
                </button>
            </div>
        </div>
        <Line color={'#39488b'} height={1}/>
    </li>
};

export class UsersList extends Component {
    render() {
        const {data} = this.props;
        return <ul id={'roomsList'}>
            {data.length > 0 ? <Line color={'#39488b'} height={1}/> : null}
            {data.map(item => {
                return <UsersElement singleData={item}/>
            })}
        </ul>
    }
}