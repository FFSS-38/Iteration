import React, { Component } from 'react';

class ChooseCreatePetPage extends Component {
  // for each pet in user list display name and avatar
  // or click to create a new pet

  // function to render a single pet choice card
  renderPetCard = (pet) => {
    console.log(JSON.stringify(pet));
    return (
      // double-check formatting of pet id
      <div className='choosePetCard'>
        <div className='choosePetImage'>
          <a className='petLink' href='http://localhost:3001/home'>
            <img
              className='petAvatar'
              src={pet.Avatar}
              id={pet._id}
              onClick={this.props.choose}
            ></img>
          </a>
        </div>
        <div className='choosePetName'>{pet.Name}</div>
      </div>
    );
  };

  render() {
    console.log(this.props.petList);
    // make an array of pet card divs
    const petCards = [];
    for (let el of this.props.petList) {
      petCards.push(this.renderPetCard(el));
    }

    return (
      <div className='petChoiceMenu'>
        <div className='petBanner'>Choose your pet</div>
        <div className='petImages'>{petCards}</div>
        <a href='http://localhost:3001/create'>
          <button>Add a pet</button>
        </a>
      </div>
    );
  }
}

export default ChooseCreatePetPage;
