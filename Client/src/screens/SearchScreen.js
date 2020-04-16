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
            from: '2020-01-03',
            to: '2020-01-03',
            maxPricePerDay: Number.MAX_SAFE_INTEGER,
            minCapacity: 0,
            resultsAvailable: [],
            showPopup: false,
            bookingRoomData: {}
        };
    }

    getItemData = (roomData) => {
        roomData.dateStart = this.state.from;
        roomData.dateEnd = this.state.to;
        this.setState({
            showPopup: !this.state.showPopup,
            bookingRoomData: roomData
        });
    };

    closePopup = () => {
        this.updateSearchResults();
        this.setState({
            showPopup: !this.state.showPopup,
            bookingRoomData: {}
        });
    };

    updateSearchResults() {
        const {from, to, maxPricePerDay, minCapacity} = this.state;
        getSearchResults(from, to, maxPricePerDay, minCapacity).then(data => {
            this.setState({resultsAvailable: data})
        })
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