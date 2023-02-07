import React, { Component } from 'react';

//This should fetch data from appropriate user upon successful login
// this should set state to equal the data returned from fetch request
// data to be returned: userData

const CreateUpdatePet = (props) => {

  let action = 'Create';
  let petName, age, breed, weight, vetID, avatarURL;
  if (Object.hasOwn(props.currentPet, name)) {
    // change to hasOwn to see if the pet has a defined name?
    petName = props.currentPet.petName;
    age = props.currentPet.age;
    breed = props.currentPet.breed;
    weight = props.currentPet.weight;
    vetID = props.currentPet.vetID;
    avatarURL = props.currentPet.avatar;
    // trying to set a flag for whether we're updating or creating??
    action = 'Update';
  }

  return (
    <div>
      <div className="banner">{action} Pet Profile</div>
      <div className="petInputs">
        <div>Owner: {props.user.name}</div>
        <div>
          Name:{' '}
          <input
            type="text"
            id="newPetName"
            // value={this.petName ?? ''}
            required
          />
        </div>
        <div>
          Breed:{' '}
          <input
            type="text"
            id="newPetBreed"
            // value={this.breed ?? ''}
            placeholder="E.g. Cat, Dog, Russian Blue, Corgi"
            required
          />
        </div>
        <div>
          Age: <input type="age" id="newPetAge" value={age ?? ''} />{' '}
          years
        </div>
        <div>
          Weight:{' '}
          <input
            type="text"
            id="newPetWeight"
            // value={this.weight ?? ''}
            required
          />{' '}
          lbs.
        </div>
        <div>
          Vet:{' '}
          <input
            type="text"
            id="newPetVet"
            // value={this.vetID ?? ''}
            required
          />
        </div>
        <div>
          Image URL:{' '}
          <input type="text" id="newAvatarUrl" value={avatarURL ?? ''} />
        </div>
        <div>
          <img className="avatarImage" src={avatarURL ?? ''}></img>
        </div>
        <a href="http://localhost:3001/home">
          <button className="createUpdatePetButton">
            {' '}
            {/* onClick={this.props.createOrUpdatePet(this.action)} {this.action} */}
          </button>
        </a>
      </div>
    </div>
  );
};
export default CreateUpdatePet;
