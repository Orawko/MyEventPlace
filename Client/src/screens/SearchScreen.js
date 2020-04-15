import React, {Component} from 'react';
import '../styles/SearchScreen.css';
import Line from '../components/line';
import ResultList from '../components/list';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';
import {toMySqlDate} from '../helpers/methods';
import {BookPopUp} from '../components/popups';


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
            from: '2020-01-03',
            to: '2020-01-03',
            maxPricePerDay: Number.MAX_SAFE_INTEGER,
            minCapacity: 0,
            resultsAvailable: [],
            showPopup: false,
            bookingRoomIndex: 0
        };
    }

    togglePopup = (index) => {
        console.log(index);
        this.setState({
            showPopup: !this.state.showPopup,
            bookingRoomIndex: index
        });
        this.getSearchResults();
    };

    confirmReservation = () => {
        const formData = new URLSearchParams();
        formData.append('idRooms', `${this.state.bookingRoomIndex}`);
        formData.append('from', `${this.state.from}`);
        formData.append('to', `${this.state.to}`);

        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `${localStorage.getItem('jwt')}`
            },
            body: formData.toString(),
        };
        fetch('http://localhost:3000/add', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.affectedRows === 1) {
                    alert('your reservation is pending!')
                    this.togglePopup(0);
                } else {
                    alert(`Invalid email or password`);
                }
            })
            .catch(() => alert(`Invalid email or password`));
    };


    getSearchResults() {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `${localStorage.getItem('jwt')}`
            }
        };
        fetch(`http://localhost:3000/result/${this.state.from}/${this.state.to}/${this.state.maxPricePerDay}/${this.state.minCapacity}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.length > 0) {
                    this.setState({
                        resultsAvailable: data
                    }, () => {
                        console.log(this.state)
                    });
                } else {
                    this.setState({
                        resultsAvailable: []
                    }, () => {
                        console.log(this.state)
                    });
                    alert(`No rooms available!`);
                }
            })
            .catch(() => alert(`Error occurred! try later or login again`))
    }

    handleDateSelect(date) {
        this.setState(prevState => {
            let selectionRange = Object.assign({}, prevState.selectionRange);
            selectionRange.startDate = date.selection.startDate;
            selectionRange.endDate = date.selection.endDate;
            let from = toMySqlDate(date.selection.startDate);
            let to = toMySqlDate(date.selection.endDate);

            return {selectionRange, from: from, to: to};
        })
    };

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
                            <h2 className={'navButtonHighlighted'} onClick={() => {
                                this.props.setScreen("search")
                            }}>Find place </h2>
                            <h2 className={'navButtonText'} onClick={() => {
                                this.props.setScreen("reservations")
                            }}>My reservations</h2>
                        </div>
                    </div>
                    <div id={'homeContent'}>
                        <div id={'dateRangeWrapper'}>
                            <DateRange
                                ranges={[this.state.selectionRange]}
                                onChange={(date) => {
                                    this.handleDateSelect(date)
                                }}
                                rangeColors={["#39488b"]}
                            />
                        </div>
                        <div id={'homeSearchOptions'}>
                            <h2>Select begin and end date</h2>

                            <div id={'additionalSearchParams'}>
                                <h4>Max price per day: </h4>
                                <input className={'input'} type="number" placeholder={'price'}
                                       onChange={evt => this.setState({
                                           maxPricePerDay:
                                               Number(evt.target.value) > 0 ? evt.target.value : Number.MAX_SAFE_INTEGER
                                       })}/>
                                <h4>Min capacity: </h4>
                                <input className={'input'} type="number" placeholder={'capacity'}
                                       onChange={evt => this.setState({
                                           minCapacity:
                                               Number(evt.target.value) > 0 ? evt.target.value : 0
                                       })}/>
                            </div>
                            <button id={'loginButton'}
                                    onClick={() => {
                                        this.getSearchResults()
                                    }}
                            >Search
                            </button>
                        </div>
                    </div>
                    <ResultList data={this.state.resultsAvailable} myReservations={false} showPopup={this.togglePopup}/>
                    {this.state.showPopup ?
                        <BookPopUp back={this.togglePopup} confirm={this.confirmReservation}/> : null
                    }
                </div>
            </div>
        );
    }
}

export default SearchScreen;