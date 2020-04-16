import React, {Component} from 'react';
import Line from "./line";

export default class ScreenHeader extends Component {
    render() {
        return (
            <div id={'homeHeader'}>
                <div id={'homeLogo'}>
                    <img src={require('../images/horizontal.png')} alt="My event place"/>
                </div>
                <h2 id={'logout'} onClick={() => this.props.logout()}>
                    <i className={'icon-logout'}/></h2>
                <Line color="white" height={1}/>
                <div id={"homeNavButtons"}>
                    <h2 className={'navButtonText'} onClick={() => {
                        this.props.setScreen("search")
                    }}>Find place </h2>
                    <h2 className={'navButtonText'} onClick={() => {
                        this.props.setScreen("reservations")
                    }}>My reservations</h2>
                </div>
            </div>
        );
    }
}
