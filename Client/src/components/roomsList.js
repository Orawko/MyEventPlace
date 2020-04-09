import React from 'react';
import Line from './line';

const ListElement = ({singleData}) => {
    const {roomNumber, price, pricePerDay, capacity, description, image} = singleData;
    return <li key={singleData}>
        <Line color={'white'} height={1}/>
        <div className={'roomOffer'}>
            <div className={'roomInfo'}>
                <h4>{roomNumber}</h4>
                <h4>Capacity: {capacity}</h4>
                <h4>Price per day: {pricePerDay}</h4>
                <h4>Price: {price}</h4>
            </div>
            <div className={'roomDescription'}>
                <h4>{description}</h4>
            </div>
            <div id={'roomImg'}>
                <img src={require(`../images/${image}`)} alt="Room photo"/>
            </div>
        </div>
    </li>;
};

const RoomsList = ({data}) => (
    <ul id={'roomsList'}>
        {data.map(item => (
            <ListElement singleData={item}/>
        ))}
    </ul>
);

export default RoomsList;