import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ user, setUser, setIsLoggedIn}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    fetch('/user/checkSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        res.json();
        if (res.status == 200) {
          setIsLoggedIn(true);
          navigate('/choose');
        }
      })
      .then((data) => {});
  }, []);

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
          // navigate('/signup');
          setLoginFailed(true);
        }
      });
  };

  return (
    <div className="login">
      <div className="user-pass">
        <label>Email</label>
        <input
          className="user-input"
          type="text"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="password-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="sign-up">
        {loginFailed && (
          <div className="loginFail">
            <p style={{ color: 'red' }}>Incorrect Login</p>
          </div>
        )}
          <button className="login-button" onClick={handleClick}>
            Login
          </button>
          <button className="signup-button" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
