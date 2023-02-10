import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
const ProfileContainer = ({
  user,
  avatar,
  breed,
  age,
  weight,
  vetID,
  lastVisit,
  _id
}) => {
  const [updatedPet, setUpdatedPet] = useState({
    _id: _id,
    Age: age,
    Weight: weight,
    Breed: breed,
    AssignedVet: vetID,
  });

  // useEffect(() => {
  //   fetch('/pet/update', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'Application/JSON',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUpdatedPet(data);
  //       console.log('Fetched data', data);
  //     });
  // }, []);
console.log('body is', updatedPet);
  const handleClick = () => {
    fetch('/pet/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: updatedPet
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("updated:", data)
        setUpdatedPet(data);
      });
  };

  // const handleBreedChange = (e) => {
  //   setUpdatedPet({...updatedPet, Breed:e.target.value})
  // }
  // const handleAgeChange = (e) => {
  //   setUpdatedPet({...updatedPet, Age:e.target.value})
  // }
  // const handleWeightChange = (e) => {
  //   setUpdatedPet({...updatedPet, Weight:e.target.value})
  // }
  // const handleVetChange = (e) => {
  //   setUpdatedPet({...updatedPet, Vet:e.target.value})
  // }
  const handleChange = (e) => {
    setUpdatedPet({ ...updatedPet, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="avatarContainer">
        <div className="avatar-container">
          <img className="avatarImage" src={avatar}></img>
        </div>
      </div>
      <div className="homeCategory">
        <div className="petAttribute">
          Lovingly cared for by: {user.FirstName}
        </div>
      </div>
      <div className="homeCategory">
        <div className="petAttribute">
          <span>Breed:</span>
          <textarea
            name="Breed"
            type="text"
            maxLength="70"
            size="10"
            defaultValue={breed}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="petAttribute">
          <span>Age:</span>
          <textarea
            name="Age"
            type="text"
            maxLength="70"
            size="10"
            defaultValue={age}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="petAttribute">
          <span>Weight:</span>
          <textarea
            name="Weight"
            type="text"
            maxLength="70"
            size="10"
            defaultValue={weight}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="homeCategory">
        <div className="petAttribute">
          <span>Vet:</span>
          <textarea
            name="AssignedVet"
            type="text"
            maxLength="70"
            size="10"
            defaultValue={vetID}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="signup-button" onClick={handleClick}>
          Update
        </button>
      </div>
    </>
  );
};
export default ProfileContainer;
