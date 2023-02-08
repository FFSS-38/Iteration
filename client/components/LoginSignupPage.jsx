import React from 'react';
import { useState } from 'react';

// this page needs to include conditional rendering of a div
// if failedLoginAttempt property in state is true, render a div that displays a message like "Please try logging in again or sign up"

// ** this page was heavily edited to still render without fetch request (mongoDB troubles!) The commented out code at the end of the file is the closest representation of what we initially had/what would work with a successful fetch request

//only push loginattempt method, push failedLoginAttempt property
const LoginSignupPage = () => {
  const [userNameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div className="login">
      <label>Username</label>
      <input
        type="text"
        id="inputUsername"
        name="username"
        value={userNameValue}
        onChange={(e) => setUserNameValue(e.target.value)}
      />
      <label>Password</label>
      <input
        type="text"
        id="inputPassword"
        name="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <a href="http://localhost:8080/choose">
        <button>Login</button>
      </a>
      <a href="http://localhost:8080/signup">
      <button>
        Sign Up
      </button>
      </a>
    </div>
  );
}
export default LoginSignupPage;
