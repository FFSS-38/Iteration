import React from 'react';

const ChooseCreatePetPage = ({ petList, choose }) => {
  const renderPetCard = pet => (
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
    <div className="petChoiceMenu">
      <div className="petBanner">Choose your pet</div>
      <div className="petImages">{petCards}</div>
      <a href="http://localhost:8080/create">
        <button>Add a pet</button>
      </a>
    </div>
  );
};

export default ChooseCreatePetPage;
