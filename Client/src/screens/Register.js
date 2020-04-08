import React, {Component, useEffect} from 'react';
import '../styles/register.css';
import {Redirect} from "react-router-dom";

class LoginRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            surname: '',
            phone: '',
            password: '',
            redirect: false
        }
    }

    postRegisterData(){
        const formData = new URLSearchParams();
        formData.append('email', `${this.state.email}`);
        formData.append('name', `${this.state.name}`);
        formData.append('surname', `${this.state.surname}`);
        formData.append('phone', `${this.state.phone}`);
        formData.append('password', `${this.state.password}`);

        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        };
        fetch('http://localhost:3000/register', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data && data.affectedRows === 1){
                    alert(`User successfully registered!`);
                    this.setState({redirect: true})
                }else {
                    alert(`Registration failed! Check data or try later.`);
                }
            })
            .catch(() => alert(`Registration failed! Check data or try later.`));
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='../login'/>;
        }

        return (
            <div id={'main'}>
                <div id={'container'}>
                    <div id={'logo'}>
                        <img id={'icon'} src={require('../images/horizontal.png')} alt="My event place"/>
                    </div>

                    <div id={'registerGui'}>
                        <input className={'input'} placeholder={'email'}  onChange={val => this.setState({email: val.target.value})}/>
                        <input className={'input'} placeholder={'name'} onChange={val => this.setState({name: val.target.value})}/>
                        <input className={'input'} placeholder={'surname'} onChange={val => this.setState({surname: val.target.value})}/>
                        <input className={'input'} placeholder={'phone'} onChange={val => this.setState({phone: val.target.value})}/>
                        <input className={'input'} placeholder={'password'} onChange={val => this.setState({password: val.target.value})} type="password"/>
                        <br/>
                        <button id={'loginButton'} onClick={ ()=> {this.postRegisterData()}}>Sign up</button>
                        <a id={'returnLink'} href="http://localhost:3006/login">Back</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRequestScreen;