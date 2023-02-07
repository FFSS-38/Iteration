import React, { Component } from 'react';

//This should fetch data from appropriate user upon successful login
// this should set state to equal the data returned from fetch request
// data to be returned: userData
class CreateUpdatePet extends Component {
  render() {
    //console.log(currentPet);
    this.action = 'Create';
    if (Object.hasOwn(this.props.currentPet, name)) {
      // change to hasOwn to see if the pet has a defined name?
      this.petName = this.props.currentPet.petName;
      this.age = this.props.currentPet.age;
      this.breed = this.props.currentPet.breed;
      this.weight = this.props.currentPet.weight;
      this.vetID = this.props.currentPet.vetID;
      this.avatarURL = this.props.currentPet.avatar;
      // trying to set a flag for whether we're updating or creating??
      this.action = 'Update';
    }

    // Something we learned the hard way: In React, if you give an HTML text input a value, that value becomes part of state. You can't type into the test field without an onChange or something
    console.log('hi from pet creator');
    console.log('action: ', this.action);
    return (
      <div>
        <div className='banner'>{this.action} Pet Profile</div>
        <div className='petInputs'>
          <div>Owner: {this.props.user.name}</div>
          <div>
            Name:{' '}
            <input
              type='text'
              id='newPetName'
              // value={this.petName ?? ''}
              required
            />
          </div>
          <div>
            Breed:{' '}
            <input
              type='text'
              id='newPetBreed'
              // value={this.breed ?? ''}
              placeholder='E.g. Cat, Dog, Russian Blue, Corgi'
              required
            />
          </div>
          <div>
            Age: <input type='age' id='newPetAge' value={this.age ?? ''} />{' '}
            years
          </div>
          <div>
            Weight:{' '}
            <input
              type='text'
              id='newPetWeight'
              // value={this.weight ?? ''}
              required
            />{' '}
            lbs.
          </div>
          <div>
            Vet:{' '}
            <input
              type='text'
              id='newPetVet'
              // value={this.vetID ?? ''}
              required
            />
          </div>
          <div>
            Image URL:{' '}
            <input type='text' id='newAvatarUrl' value={this.avatarURL ?? ''} />
          </div>
          <div>
            <img className='avatarImage' src={this.avatarURL ?? ''}></img>
          </div>
          <a href='http://localhost:3001/home'>
            <button className='createUpdatePetButton'>
              {' '}
              {/* onClick={this.props.createOrUpdatePet(this.action)} {this.action} */}
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default CreateUpdatePet;
