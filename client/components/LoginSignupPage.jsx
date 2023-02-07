import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// this page needs to include conditional rendering of a div
// if failedLoginAttempt property in state is true, render a div that displays a message like "Please try logging in again or sign up"

// ** this page was heavily edited to still render without fetch request (mongoDB troubles!) The commented out code at the end of the file is the closest representation of what we initially had/what would work with a successful fetch request

//only push loginattempt method, push failedLoginAttempt property
class LoginSignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNameValue: '',
      passwordValue: '',
    };
    // console.log('this.attemptLogin', this.attemptLogin);
    // console.log('this.props.login', this.props.attemptLogin);
    console.log('this.props.failedLoginAttempt', this.props.failedLoginAttempt);
  }
  render() {
    // if (!this.props.failedLoginAttempt) {
    return (
      <div className="login">
        <label>Username</label>
        <input
          type="text"
          id="inputUsername"
          name="username"
          value={this.state.userNameValue}
          onChange={(e) => this.setState({ userNameValue: e.target.value })}
        />
        <label>Password</label>
        <input
          type="text"
          id="inputPassword"
          name="password"
          value={this.state.passwordValue}
          onChange={(e) => this.setState({ passwordValue: e.target.value })}
        />
        <a href="http://localhost:3001/choose">
          <button>Login</button>
        </a>
        <button
        // onClick={(e) => {
        //   const username = this.state.userNameValue;
        //   const password = this.state.passwordValue;
        //   return this.props.signUp(username, password);
        // }}
        >
          Sign Up
        </button>
      </div>
    );
  }
  /*
    {/* } else {
      return (
        <div>
          <h3 id='failedLoginMessage'>
            Please try logging in again or signing up
          </h3>
          <label>Username</label>
          <input
            type='text'
            id='inputUsername'
            name='username'
            value={this.state.userNameValue}
            onChange={(e) => this.setState({ userNameValue: e.target.value })}
          />
          <label>Password</label>
          <input
            type='text'
            id='inputPassword'
            name='password'
            value={this.state.passwordValue}
            onChange={(e) => this.setState({ passwordValue: e.target.value })}
          />
          <button
            onClick={(e) => {
              const username = this.state.userNameValue;
              const password = this.state.passwordValue;
              console.log('inside onClick');
              navigate = useNavigate();
              navigate('/choose');
              // return this.props.attemptLogin(username, password);
            }}
          >
            Login
          </button>
          <Link to='/choose' className='linkToChoose'>
            <button
              onClick={(e) => {
                const username = this.state.userNameValue;
                const password = this.state.passwordValue;
                return this.props.signUp(username, password);
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      );
    }
  }
} */
}

export default LoginSignupPage;
