import React, {Component} from 'react';
import '../styles/SearchScreen.css';
import ResultList from '../components/list';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';
import {toMySqlDate} from '../helpers/methods';
import {BookPopUp} from '../components/popups';
import {getSearchResults} from '../helpers/rest';
import ScreenHeader from '../components/header';


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
            dateStart: toMySqlDate(new Date()),
            dateEnd: toMySqlDate(new Date()),
            maxPricePerDay: Number.MAX_SAFE_INTEGER,
            minCapacity: 0,
            resultsAvailable: [],
            showPopup: false,
            bookingRoomData: {}
        };
    }

    getItemData = (roomData) => {
        roomData.dateStart = this.state.dateStart;
        roomData.dateEnd = this.state.dateEnd;
        this.setState({
            showPopup: !this.state.showPopup,
            bookingRoomData: roomData
        });
    };

    closePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup,
            bookingRoomData: {}
        });
        this.updateSearchResults();
    };

    updateSearchResults() {
        const {dateStart, dateEnd, maxPricePerDay, minCapacity} = this.state;
        getSearchResults(dateStart, dateEnd, maxPricePerDay, minCapacity).then(data => {
            this.setState({resultsAvailable: data})
        })
    }

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
        return (
            <div id={'main'}>
                <div id={'container'}>
                    <ScreenHeader {...this.props}/>
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
                                        this.updateSearchResults()
                                    }}
                            >Search
                            </button>
                        </div>
                    </div>
                    <ResultList data={this.state.resultsAvailable} myReservations={false}
                                getItemData={this.getItemData}/>
                    {this.state.showPopup ?
                        <BookPopUp back={this.closePopup} data={this.state.bookingRoomData}/> : null
                    }
                </div>
            </div>
        );
    }
}

export default SearchScreen;