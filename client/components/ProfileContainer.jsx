import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// do we actually need petattribute card?
import PetAttributeCard from './cards/PetAttributeCard.jsx';

class ProfileContainer extends Component {
  render() {
    console.log('hi from profile');
    return (
      <container>
        <div className='avatarContainer'>
          <div>
            <img className='avatarImage' src={this.avatar}></img>
          </div>
        </div>
        <div className='homeCategory'>
          <div className='petAttribute'>
            Lovingly cared for by: {/*{this.props.users}*/} Mr. Wunderpus
          </div>
        </div>
        <div className='homeCategory'>
          <div className='petAttribute'>Breed: {this.props.breed}</div>
          <div className='petAttribute'>Age: {this.props.age}</div>
          <div className='petAttribute'>Weight: {this.props.weight}</div>
        </div>
        {/* what's the data structure for vets? How do we get the vet name from the vet ID?*/}
        <div className='homeCategory'>
          <div className='petAttribute'>Vet: {this.props.vetID}</div>
          <div className='petAttribute'>
            Last vet visit: {this.props.lastVisit}
          </div>
        </div>
      </container>
    );
  }
}

export default ProfileContainer;
