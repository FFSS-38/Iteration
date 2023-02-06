import React, { Component } from 'react';

class ChooseCreatePetPage extends Component {
  // for each pet in user list display name and avatar
  // or click to create a new pet

  // function to render a single pet choice card
  renderPetCard = (pet) => {
    return (
      // double-check formatting of pet id
      <div className='choosePetCard'>
        <div className='choosePetImage'>
          <img src={pet.avatar} id={pet._id} onClick={this.props.choose}></img>
        </div>
        <div className='choosePetName'>{pet.name}</div>
      </div>
    );
  };

  render() {
    // make an array of pet card divs
    const petCards = [];
    for (let el of this.props.user.petList) {
      petCards.push(renderPetCard(el));
    }

    return (
      <div className='petChoiceMenu'>
        <div className='banner'>Choose your pet</div>
        <div>{petCards}</div>
        <button>Add a pet</button>
      </div>
    );
  }
}

export default ChooseCreatePetPage;
