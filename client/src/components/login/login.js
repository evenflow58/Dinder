import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { getToken } from '../../actions/auth';
import { setAccessToken } from '../../services/cookieService';

class Login extends Component {
  responseGoogle = (response) => {
    this.props.getToken('google', response.googleId)
      .then(({ payload: { data } }) => {
        debugger;
      });
  }

  errorGoogle = (error) => {
    debugger;
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId='578670467109-uvdindss9pgn30v919rr7sbvj5hs4l35.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={this.responseGoogle}
          onFailure={this.errorGoogle}
        />
        {/* <FacebookLogin
          appId='1088597931155576'
          autoLoad={true}
          fields='name,email,picture'
          onClick={componentClicked}
          callback={responseFacebook} /> */}
      </div>
    );
  }
}

// function mapStateToProps({ auth }) {
//   debugger;
//   return auth;
// }

// export default connect(mapStateToProps, { getToken })(Login);
export default connect(null, { getToken })(Login);