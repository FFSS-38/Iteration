import React, { Component } from 'react';

// this page needs to include conditional rendering of a div
// if failedLoginAttempt property in state is true, render a div that displays a message like "Please try logging in again or sign up"

//only push loginattempt method, push failedLoginAttempt property
class LoginSignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNameValue: '',
      passwordValue: '',
    };
  }
  render() {
    if (!this.props.failedLoginAttempt) {
      return (
        <div className='login'>
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
              return this.props.attemptLogin(username, password);
            }}
          >
            Login
          </button>
          <button
            onClick={(e) => {
              const username = this.state.userNameValue;
              const password = this.state.passwordValue;
              return this.props.signUp(username, password);
            }}
          >
            Sign Up
          </button>
        </div>
      );
    } else {
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
          <Link to='/create' className='linkToCreate'>
            <button
              onClick={(e) => {
                const username = this.state.userNameValue;
                const password = this.state.passwordValue;
                return this.props.attemptLogin(username, password);
              }}
            >
              Login
            </button>
          </Link>
          <Link to='/create' className='linkToCreate'>
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
}

//no link in button click? link within fetch request?

{
  /* <Link to="/" className="backLink">
<button type="button" className="btnSecondary">
    Back to all characters
</button>
</Link>
class LoginSignupPage extends Component {
  render() {
    return <div>Login</div>;
  }
} */
}

export default LoginSignupPage;
