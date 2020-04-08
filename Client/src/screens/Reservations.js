import React, {Component} from 'react'
import Line from "../components/line";

class Reservations extends Component {
    render(){
        return(
            <div id={'main'}>
                <div id={'container'}>
                    <div id={'homeHeader'}>
                        <div id={'homeLogo'}>
                            <img src={require('../images/horizontal.png')} alt="My event place"/>
                        </div>
                        <Line color="white" height={1}/>
                        <div id={"homeNavButtons"}>
                            <h2 className={'navButtonText'} onClick={() => { this.props.setScreen("search")}}>Find place </h2>
                            <h2 className={'navButtonHighlighted'} onClick={() => { this.props.setScreen("reservations")}}>My reservations</h2>
                        </div>
                    </div>
                    <div id={'reservationList'}>
                        <h1>My reservations...</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reservations;