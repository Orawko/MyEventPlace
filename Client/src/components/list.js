import React from 'react';
import Line from './line';
import "../fontello/css/gates.css"

const SearchedRoom = ({singleData, handleClick}) => {
    const {roomNumber, days, pricePerDay, capacity, description, image} = singleData;
    return <li>
        <div className={'roomOffer'}>
            <div className={'roomInfo'}>
                <h4>{roomNumber}</h4>
                <h4><i className={'icon-group'}/>{capacity}</h4>
                <div>
                    <h4><i className={'icon-dollar'}/>{pricePerDay * days}</h4>
                    <br/>
                    <h5><i className={'icon-dollar'}/>{pricePerDay}/day</h5>
                </div>
            </div>
            <div className={'roomDescription'}>
                <h4>{description}</h4>
                <button id={'bookButton'} onClick={() => {
                    handleClick(singleData)
                }}>Book
                </button>
            </div>
            <div id={'roomImg'}>
                <img src={require(`../images/${image}`)} alt="Room photo"/>
            </div>
        </div>
        <Line color={'white'} height={1}/>
    </li>;
};

const MyReservation = ({singleData, handleClick}) => {
    const {roomNumber, capacity, description, image, price, dateStart, dateEnd, status} = singleData;
    return <li>
        <div className={'roomOffer'}>
            <div className={'roomInfo'}>
                <h4>{roomNumber}</h4>
                <h4><i className={'icon-group'}/>{capacity}</h4>
                <div>
                    <h4><i className={'icon-dollar'}/>{price}</h4>
                    <br/>
                    <h5>From: {dateStart}</h5>
                    <h5>To: {dateEnd}</h5>
                    <h5>Status: {status}</h5>
                </div>
            </div>
            <div className={'roomDescription'}>
                <h4>{description}</h4>
                <div>
                    <button id={'bookButton'} onClick={() => {
                        handleClick(singleData, 'edit')
                    }}>Edit
                    </button>
                    <button className={'deleteButton'} onClick={() => {
                        handleClick(singleData, 'delete')
                    }}>Delete
                    </button>
                </div>
            </div>
            <div id={'roomImg'}>
                <img src={require(`../images/${image}`)} alt="Room photo"/>
            </div>
        </div>
        <Line color={'white'} height={1}/>
    </li>;
};

const ResultList = ({data, myReservations, getItemData}) => (
    <ul id={'roomsList'}>
        {data.length > 0 ? <Line color={'white'} height={1}/> : null}
        {data.map(item => {
            return myReservations ?
                <MyReservation key={item.idReservations} singleData={item} handleClick={getItemData}/> :
                <SearchedRoom key={item.roomNumber} singleData={item} handleClick={getItemData}/>
        })}
    </ul>
);

export default ResultList;