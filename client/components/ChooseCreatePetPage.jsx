import React from 'react';
import { useState } from 'react';

const ChooseCreatePetPage = ({ petList, choose }) => {
  const renderPetCard = (pet) => (
    <div className="choosePetCard">
      <div className="choosePetImage">
        <a className="petLink" href="http://localhost:3001/home">
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
      <a href="http://localhost:3001/create"></a>
      <button className='add-pet'>Add a pet</button>
    </div>
  );
};

export default ChooseCreatePetPage;
