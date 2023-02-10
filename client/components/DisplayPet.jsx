import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const DisplayPet = (props) => {
  const [petList, setPetList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/user/pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPetList([...data]);
        console.log(petList);
      });
  }, [])


  const renderPetCard = (pet) => (
    <div
      className='choosePetCard'
      onClick={() => {
        navigate('/home');
        props.setCurrentPet(pet);
      }}
    >
      <div className='choosePetImage'>
        <img
          className='petPicture'
          src={pet.URL}
          id={pet._id}
          onClick={() => navigate('/home')}
        />
      </div>
      <div className='choosePetName'>{pet.Name}</div>
    </div>
  );

  const petCards = petList.map(renderPetCard);

  return (
    <div className='choice-container'>
      <div className='petChoiceMenu'>
        <div className='petImages'>{petCards}</div>
      </div>
      <div className='pet-button-container'>
        <button className='add-pet' onClick={() => navigate('/create')}>
          Add a Pet
        </button>
        {/* <button className='add-pet' onClick={handleClick}>
          Choose a Pet
        </button> */}
      </div>
    </div>
  );
};

export default DisplayPet;
