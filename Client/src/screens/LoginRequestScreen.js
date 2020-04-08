import React, {Component} from 'react';
import '../styles/LoginRequestScreen.css';
import { Redirect } from "react-router-dom";

class LoginRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }

    postLoginData() {
        const formData = new URLSearchParams();
        formData.append('email', `${this.state.email}`);
        formData.append('password', `${this.state.password}`);

        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        };
        fetch('http://localhost:3000/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.success) {
                    console.log(this.props);
                    this.props.authenticate();
                    //this.setState({redirect: true})
                } else {
                    alert(`Invalid email or password`);
                }
            })
            .catch(() => alert(`Invalid email or password`));
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='../'/>;
        }

        return (
            <div id={'main'}>
                <div id={'container'}>
                    <div id={'logo'}>
                        <img id={'icon'} src={require('../images/horizontal.png')} alt="My event place"/>
                    </div>

                    <div id={'loginGui'}>
                        <input className={'input'} placeholder={'email'}
                               onChange={val => this.setState({email: val.target.value})}/>
                        <input className={'input'} placeholder={'password'}
                               onChange={val => this.setState({password: val.target.value})} type="password"/>
                        <button id={'loginButton'} onClick={() => {
                            this.postLoginData()
                        }}>Sign in
                        </button>
                        <a className={'text'} href='http://localhost:3006/register'>Forgot password?</a>
                        <a className={'text'} href='http://localhost:3006/register'>Sign up</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRequestScreen;