import React from 'react';
import { useState } from 'react';


const SignupPage = ({setUser, setCurrentPet}) => {

    //FirstName
    //LastName
    //Email
    //Password
    //Pets
    return(
        <div className="signUp">
        <label>FirstName</label>
        <input
          type="text"
          id="FirstName"
          name="username"
        />
        <label>LastName</label>
        <input
          type="text"
          id="LastName"
          name="username"
        />
        <label>Email</label>
        <input
          type="text"
          id="Email"
          name="username"
        />
        <label>Password</label>
        <input
          type="text"
          id="Password"
          name="username"
        />
        <label>Pets</label>
        <input
          type="text"
          id="Pets"
          name="username"
        />
        </div>
    );
}

export default SignupPage;