import React, { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

//This should fetch data from appropriate user upon successful login
// this should set state to equal the data returned from fetch request
// data to be returned: userData

const CreatePet = ({user, setPetList, petList}) => {
  const [pet, setPet] = useState({});
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [breed, setBreed] = useState('')
  const [vet, setVet] = useState('')
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  console.log(user)

  const handleClick = () => {
    fetch('/pet/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
          },
        body: JSON.stringify({
            Name: name,
            Age: age,
            Weight: weight,
            Breed: breed,
            URL: url,
            AssignedVet: vet
        })
    }) 
    .then(resp => resp.json())
    .then(data => {
        setPet(data);
    });
    }

  return (
    <div className='create-container'>
      <div className="banner">Pet Profile</div>
      <div className="petInputs">
        <div>Owner: {user.FirstName}</div>
        <div>
          Name:
          <input
            id='newPetName'
            type="text"
            required
            onChange={(event) => setName(event.target.value) }
          />
        </div>
        <div>
          Breed:
          <input
            id='newPetBreed'
            type="text"
            required
            onChange={(event) => setBreed(event.target.value)}
          />
        </div>
        <div>
          Age: <input 
          id='newPetAge'
          type="age" 
          onChange={(event) => setAge(event.target.value) }
          
          />
          &nbsp;years
        </div>
        <div>
          Weight:
          <input
            type="text"
            id='newPetWeight'
            required
            onChange={(event) => setWeight(event.target.value) }
          />
          &nbsp;lbs.
        </div>
        <div>
          Vet:
          <input
            type="text"
            id='newPetVet'
            required
            onChange={(event) => setVet(event.target.value) }
          />
        </div>
        <div>
          Img URL:
          <input
            type="text"
            id='newPetUrl'
            required
            onChange={(event) => setUrl(event.target.value) }
          />
        </div>
      </div>
      <div className='signup-buttons-box'> 
          <button className="createUpdatePetButton"
          onClick={() => { handleClick(); navigate('/choose')}}
          >
            Save
          </button>
          <button className="createUpdatePetButton" onClick={() => navigate('/choose')}>
            Back
          </button>
      </div>
    </div>
  );
};
export default CreatePet;


/*#newPetBreed,
#newPetName, 
#newPetWeight,
#newPetAge,
#newPetVet */