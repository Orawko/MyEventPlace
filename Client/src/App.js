import React, {Component} from "react";
import SearchScreen from './screens/SearchScreen';
import Register from './screens/Register';
import LoginRequestScreen from './screens/LoginRequestScreen';
import Reservations from './screens/Reservations';
import AdminPanel from './screens/AdminPanel';
import {userAuthenticated} from './helpers/rest';
import "./fontello/css/gates.css";

import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            screen: 'search'
        };

        userAuthenticated().then(value => {
            this.setState({isAuthenticated: value})
        });
    }

    authenticate() {
        this.setState({isAuthenticated: true});
    }

    logout() {
        this.setState({isAuthenticated: false});
        this.setScreen('search');
        localStorage.removeItem('jwt');
    }

    setScreen(newScreen) {
        this.setState({screen: newScreen === 'search' ? 'search' : 'reservations'});
    }

    render() {
        return (
            <Router>
                {this.state.isAuthenticated ?
                    <Switch>
                        <Route path="/admin">
                            <AdminPanel logout={this.logout.bind(this)}/>
                        </Route>
                        <Route path="/">
                            {this.state.screen === 'search'
                                ? <SearchScreen setScreen={this.setScreen.bind(this)} logout={this.logout.bind(this)}/>
                                : <Reservations setScreen={this.setScreen.bind(this)} logout={this.logout.bind(this)}/>}
                        </Route>
                    </Switch> :
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