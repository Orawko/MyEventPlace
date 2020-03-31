import React, {Component} from 'react';
import '../styles/SearchScreen.css';
import Line from '../components/line';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

class SearchScreen extends Component {

    render() {
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        };

        return (
            <div id={'main'}>
                <div id={'container'}>
                    <div id={'navigationSearch'}>
                        <div id={'logoSearch'}>
                            <img src={require('../images/horizontal.png')} alt="My event place"/>
                        </div>
                        <Line color="white" height={1} />
                        <div id={"buttonsSearch"}>
                            <h2 className={'navButtonText'}>Find place </h2>
                            <h2 className={'navButtonText'}>My reservations</h2>
                        </div>
                    </div>
                    <div id={'dateSelect'}>
                        <div id={'dateRangeWrapper'}>
                            <DateRange
                                ranges={[selectionRange]}
                                onChange={this.handleSelect}
                                rangeColors={["#39488b"]}
                            />
                        </div>
                        <div id={'searchOptions'}>
                            <h2 className={'navButtonText'}>Select begin and end date</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchScreen;