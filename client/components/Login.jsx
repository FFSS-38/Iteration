import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// this page needs to include conditional rendering of a div
// if failedLoginAttempt property in state is true, render a div that displays a message like "Please try logging in again or sign up"

// ** this page was heavily edited to still render without fetch request (mongoDB troubles!) The commented out code at the end of the file is the closest representation of what we initially had/what would work with a successful fetch request

//only push loginattempt method, push failedLoginAttempt property

const Login = ({ user, setUser }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   //http://localhost:3000/user/checkSession
  //   fetch('http://localhost:3000/user/checkSession', {
  //     headers: {
  //       'Content-Type': 'Application/JSON'
  //     }
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
  // },[])

  const handleClick = () => {
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Email === email) {
          setUser(data);
          setIsLoggedIn(true);
          navigate('/choose');
        } else {
          navigate('/signup');
        }
      });
  };

  return (
    <div className='login'>
      <div className='user-pass'>
        <label>Email</label>
        <input
          className='user-input'
          type='text'
          name='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className='password-input'
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='sign-up'>
          <button className='login-button' onClick={handleClick}>
            Login
          </button>
          <button className='signup-button' onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
