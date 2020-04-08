import React, {Component} from "react";
import SearchScreen from './screens/SearchScreen'
import Register from './screens/Register'
import LoginRequestScreen from './screens/LoginRequestScreen'
import Reservations from './screens/Reservations'

import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            screen: 'search'
        };
    }

    authenticate() {
        this.setState({isAuthenticated: true}, () => {
            console.log(this.state)
        });
    }

    setScreen(newScreen) {
        this.setState({screen: newScreen === 'search' ? 'search' : 'reservations'});
    }

    render() {
        return (
            <Router>
                {this.state.isAuthenticated ?
                    <Route path="/">
                        {this.state.screen === 'search'
                            ? <SearchScreen setScreen={this.setScreen.bind(this)}/>
                            : <Reservations setScreen={this.setScreen.bind(this)}/>}
                    </Route> :
                    <Switch>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/">
                            <LoginRequestScreen authenticate={this.authenticate.bind(this)}/>
                        </Route>
                    </Switch>}

            </Router>
        );
    }
}

export default App;