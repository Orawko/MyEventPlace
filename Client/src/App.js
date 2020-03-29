import React, {Component} from "react";
import SearchScreen from './screens/SearchScreen'
import Reservations from './screens/Reservations'
import LoginRequestScreen from './screens/LoginRequestScreen'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isAuthenticated: true};
    }

    render() {
        return (
            <Router>
                {this.state.isAuthenticated ? <div>
                    {/*<nav>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/">Find place - public</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/reservations">Reservations - protected</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/login">Login</Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</nav>*/}

                    <Switch>
                        <Route path="/login">
                            <LoginRequestScreen/>
                        </Route>
                        <Route path="/reservations">
                            <Reservations/>
                        </Route>
                        <Route path="/">
                            <SearchScreen/>
                        </Route>
                    </Switch>

                </div> : <LoginRequestScreen/>}

            </Router>
        );
    }
}

export default App;