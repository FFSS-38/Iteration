import React from 'react';
import { useState } from 'react';


const SignupPage = ({user , setUser}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log('user', user)

   const handleClick = () => {
    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
          },
        body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
        })
    }) 
    .then(resp => resp.json())
    .then(data => {
        setUser(data);
    console.log('user', user)
    })
    }

    return(
        <div className="signUp">
        <label>First Name</label>
        <input
        className='user-input'
          type="text"
          id="FirstName"
          name="username"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label>Last Name</label>
        <input
        className='user-input'
          type="text"
          id="LastName"
          name="username"
          onChange ={(event) => setLastName(event.target.value)}
        />
        <label>Email</label>
        <input
        className='user-input'
          type="text"
          id="Email"
          name="username"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password</label>
        <input
        className='user-input'
          type="text"
          id="Password"
          name="username"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className='signup-buttons-box'>
        <a href="http://localhost:8080/choose">
        <button className='signup-button'
        onClick={() => handleClick()}
        >Sign up</button>    
        </a>
        <a href="http://localhost:8080/">
        <button className='login-button'>Back to Login</button>  
        </a>  
        </div> 
        </div>
    );
}

/*
const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pets, setPets] = useState([]); */
export default SignupPage;