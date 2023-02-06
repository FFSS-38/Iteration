import React, { Component } from 'react';

// I don't think this will be used - all of this functionality will be put into onClick methods

//This should fetch data from appropriate user upon successful login
// this should set state to equal the data returned from fetch request
// data to be returned: userData
class CreateUpdatePet extends Component {
  componentDidMount() {
    // if there is a current pet, load its data into the relevant fields
    // remember that we're updating rather than creating a pet
    // fetch('getUserInfo') // => /username?userName=
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('data from choose/create pet: ', data);
    //   })
    // this is where this.setState({}) is used to redefine state to retrieved data
    // .then((characters, favs = {}) => {
    //   const { characterIds, charactersById, nicknames, fav_foods } =
    //     this.formatCharacters(characters);
    //   return this.setState({
    //     fetchedChars: true,
    //     characterIds,
    //     charactersById,
    //     favs,
    //     nicknames,
    //     fav_foods,
    //   });
    // })
    // .catch((err) =>
    //   console.log('App.componentDidMount: get characters: ERROR: ', err)
    // );
  }

  render() {
    //console.log(currentPet);
    this.action = 'Create';
    if (this.props.currentPet) {
      // change to hasOwn to see if the pet has a defined name?
      this.petName = this.props.currentPet.petName;
      this.age = this.props.currentPet.age;
      this.breed = this.props.currentPet.breed;
      this.weight = this.props.currentPet.weight;
      this.vetID = this.props.currentPet.vetID;
      // trying to set a flag for whether we're updating or creating??
      this.action = 'Update';
    }
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
              value={this.petName ?? ''}
              required
            />
          </div>
          <div>
            Breed:{' '}
            <input
              type='text'
              id='newPetBreed'
              value={this.breed ?? ''}
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
              value={this.weight ?? ''}
              required
            />{' '}
            lbs.
          </div>
          Vet:{' '}
          <input type='text' id='newPetVet' value={this.vetID ?? ''} required />
        </div>
        <button className='createUpdatePetButton'>Submit</button>
      </div>
    );
  }
}

export default CreateUpdatePet;
