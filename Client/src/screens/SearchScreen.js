import React, {Component} from 'react';
import '../styles/SearchScreen.css';
import Line from '../components/line';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';
import {toMySqlDate} from '../helpers/methods';

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
            begin: '2020-01-02',
            end: '2020-01-03',
            price: 100000,
            capacity: 10000,
            resultsAvalible: false
        };
    }

    handleDateSelect(date) {
        this.setState(prevState => {
            let selectionRange = Object.assign({}, prevState.selectionRange);
            selectionRange.startDate = date.selection.startDate;
            selectionRange.endDate = date.selection.endDate;
            let begin = toMySqlDate(date.selection.startDate);
            let end = toMySqlDate(date.selection.endDate);

            return {selectionRange, begin, end};
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
                                       onChange={evt => this.setState({price: evt.target.value})}/>
                                <h4>Min capacity: </h4>
                                <input className={'input'} type="number" placeholder={'capacity'}
                                       onChange={evt => this.setState({capacity: evt.target.value})}/>
                            </div>
                            <button id={'loginButton'}
                                    onClick={() => {
                                        alert(`${this.state}`)
                                    }}
                            >Search
                            </button>
                        </div>
                    </div>
                    {this.state.resultsAvalible ?
                        <h1> Wyniki!</h1>
                        : <div/>}
                </div>
            </div>
        );
    }
}

export default SearchScreen;