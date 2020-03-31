import React, {Component} from 'react';
import '../styles/LoginRequestScreen.css';

class LoginRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div id={'main'}>
                <div id={'container'}>
                    <div id={'logo'}>
                        <img id={'icon'} src={require('../images/horizontal.png')} alt="My event place"/>
                    </div>

                    <div id={'loginGui'}>
                        <input className={'input'} placeholder={'email'}/>
                        <input className={'input'} placeholder={'password'}/>
                        <button id={'loginButton'}>Sign in</button>
                        <a className={'text'} href='http://localhost:3006/forgot'>Forgot password?</a>
                        <a className={'text'} href='http://localhost:3006/register'>Sign up</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRequestScreen;