import React, { Component, useEffect } from 'react';
import { useState } from 'react';

// this page needs to include conditional rendering of a div
// if failedLoginAttempt property in state is true, render a div that displays a message like "Please try logging in again or sign up"

// ** this page was heavily edited to still render without fetch request (mongoDB troubles!) The commented out code at the end of the file is the closest representation of what we initially had/what would work with a successful fetch request

//only push loginattempt method, push failedLoginAttempt property
const LoginSignupPage = () => {
  const [userNameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleClick = () => {
    fetch('/') 
  };
  /* Users.create({ Name: req.body.Name, Password: req.body.Password })
    .then((user) => {
      res.locals.user = user;
      return next();
    })


    /createUser :: path='/
      // http://localhost:3000/api/users/
      //send the following request : { "Name":"Pierre", "Password":"Jacquemin"}
      //response: {"Name":"Pierre","Password":"Jacquemin","Pets":[],"_id":"63e1213bcb9b9423d0ba43a7","__v":0}   
    */

  return (
    <div className="login">
      <div className='user-pass'> 
      <label>Username</label>
      <input
      className='user-input'
        type="text"
        name="username"
        value={userNameValue}
        onChange={(e) => setUserNameValue(e.target.value)}
      />
      <label>Password</label>
      <input
      className='password-input'
        type="text"
        name="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <div className='sign-up'> 
      <a href="http://localhost:8080/choose">
        <button className='login-button'>Login</button>
      </a>
      <button onClick={handleClick} className='signup-button'>Sign Up</button>
      </div>
      </div>
    </div>
  );
};
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

export default LoginSignupPage;
