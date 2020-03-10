import React, {Component} from 'react';

class Loginscreen extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }
render() {
    return (
      <div>
       <h1>Hello Login Screen!</h1>
      </div>
    );
  }
}

export default Loginscreen;