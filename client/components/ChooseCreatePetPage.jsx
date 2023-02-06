import React, { Component } from 'react';

// I don't think this will be used - all of this functionality will be put into onClick methods

//This should fetch data from appropriate user upon successful login
// this should set state to equal the data returned from fetch request
// data to be returned: userData
class ChooseCreatePetPage extends Component {
  componentDidMount() {
    fetch('getUserInfo') // => /username?userName=
      .then((res) => res.json())
      .then((data) => {
        console.log('data from choose/create pet: ', data);
      })
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
      .catch((err) =>
        console.log('App.componentDidMount: get characters: ERROR: ', err)
      );
  }

  render() {
    return <div>Create pet page</div>;
  }
}

export default ChooseCreatePetPage;
