import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const DisplayPet = () => {
  const [petList, setPetList] = useState([]);

  const handleClick = () => {
    fetch('http://localhost:3000/user/pets', {
      headers: {
        'Content-Type': 'Application/JSON'
      }
    }) 
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  }

  const renderPetCard = (pet) => (
    <div className="choosePetCard">
      <div className="choosePetImage">
        <a className="petLink" href="http://localhost:8080/home">
          <img
            className="petAvatar"
            src={pet.Avatar}
            id={pet._id}
            onClick={choose}
          />
        </a>
      </div>
      <div className="choosePetName">{pet.Name}</div>
    </div>
  );
  
  const petCards = petList.map(renderPetCard);

  return (
    <div className="choice-container">
      <div className="petChoiceMenu">
        <div className="petImages">{petCards}</div>
      </div>
      <div className='pet-button-container'> 
      <a href="http://localhost:8080/create">
      <button className='add-pet'>Add a Pet</button>
      </a>
      <button className='add-pet' onClick={handleClick}>Choose a Pet</button>
      </div>
    </div>
  );
};

export default DisplayPet;
