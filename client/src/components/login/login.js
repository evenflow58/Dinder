import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

export default class Login extends Component {
  responseGoogle = (response) => {
    debugger;
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="578670467109-uvdindss9pgn30v919rr7sbvj5hs4l35.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        {/* <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook} /> */}
      </div>
    );
  }
}
