import React, {Component} from "react";
import Searchscreen from './screens/Search'
import Reservations from './screens/Reservations'
import Loginscreen from './screens/Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    render() {
        return (
            <Router>
                {this.state.isLoggedIn ? <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Find place</Link>
                            </li>
                            <li>
                                <Link to="/reservations">Reservations</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/reservations">
                            <Reservations/>
                        </Route>
                        <Route path="/login">
                            <Loginscreen/>
                        </Route>
                        <Route path="/">
                            <Searchscreen/>
                        </Route>
                    </Switch>
                </div> : <Loginscreen/>}

            </Router>
        );
    }
}

export default App;