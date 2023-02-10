import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignupPage = ({ user, setUser, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data);
        console.log('user', user);
      });
    navigate('/choose');
  };

  return (
    <div className="signUp">
      <label>First Name</label>
      <input
        className="user-input"
        type="text"
        id="FirstName"
        name="username"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <label>Last Name</label>
      <input
        className="user-input"
        type="text"
        id="LastName"
        name="username"
        onChange={(event) => setLastName(event.target.value)}
      />
      <label>Email</label>
      <input
        className="user-input"
        type="text"
        id="Email"
        name="username"
        onChange={(event) => setEmail(event.target.value)}
      />
      <label>Password</label>
      <input
        className="user-input"
        type="password"
        id="Password"
        name="username"
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className="signup-buttons-box">
        <button className="signup-button" onClick={() => handleClick()}>
          Sign up
        </button>
        <button className="login-button" onClick={() => navigate('/')}>
          Back to Login
        </button>
      </div>
    </div>
  );
};
export default SignupPage;
