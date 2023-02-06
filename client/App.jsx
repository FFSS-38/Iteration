import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginSignupPage from './components/LoginSignupPage';
import HomePage from './components/HomePage';
import ChooseCreatePetPage from './components/ChooseCreatePetPage';
import CreateUpdatePet from './components/CreateUpdatePet';

/*
      // Pet schema: {
        Name: { type: String, required: true },
        Age: { type: Number },
        Avatar: { type: String },
        Notes: { type: String },
        Weight: { type: Number, required: true },
        Breed: { type: String, required: true },
        LastVisit: { type: Date, required: true },
        ScheduledEvents: **Type changed to array
        VetID: { type: String, required: true },
      }
      
      user {
        userName: ""
        arrayofPets: [] // contains petID
      }
*/

import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      petList: [], // an array that contains objects (each pet's data)
      currentPet: {}, // could be index that corresponds to index of pet
      // isDataLoaded: false,
      failedLoginAttempt: false,
      // chosenPet: 0, // this will be petID
    };

    // this is where we bind methods to this
    this.attemptLogin = this.attemptLogin.bind(this);
    this.choosePet = this.choosePet.bind(this);
    this.createPet = this.createPet.bind(this);
  }

  attemptLogin = (username, password) => {
    // by request of the backend team, parameterize username
    // send pw in body of request
    const endpoint = `/connect/`;
    fetch(endpoint, {
      body: { Name: username, Password: password },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // successful login gives response array: [{userdoc}, [petListwithpetobj]]
        if (Array.isArray(data)) {
          console.log('successful login data: ' + JSON.stringify(data));
          this.setState({ user: data[0] });
          console.log(this.state.user);
          this.setState({ petList: data[1] });
          console.log(this.state.petList);
        } else {
          // alert with response string to clarify the problem
          this.setState({ failedLoginAttempt: true });
        }
      });
  };

  // ? Are we using OAuth? If not, send POST request with userName and password in request body
  // on response:
  //   is user is not authenticated
  //    setState: failedLoginAttempt set to true (this triggers conditional rendering of "please try again or sign up");
  //  if user is authenticated, server should redirect to the /create endpoint (this will trigger this route?) and send user document
  //    setState: state.failedLoginAttempt to false (this returns to default, conditionally rendered div will not render)
  //    setState: state.user assigned value of response obj body (user document data)
  //    setState: state.petList assigned value of response obj body (list of pets)

  choosePet = (e) => {
    // console.log click event for testing purposes
    console.log(e);
    // an awkward loop to find the chosen pet is the price of one GET request upon login:
    for (let pet of this.state.petList) {
      if (pet._id === e.target.id) {
        console.log('pet match found: ' + pet.name + ' ' + pet._id);
        this.setState({ currentPet: pet });
      }
    }
  };
  // ** the below code is not relevant any longer for current plan.
  //petID of chosen pet needs to be passed in to this function
  //   fetch(`/getPetInfo?petId=${petID}`) //clarify this endpoint - I know this isn't secure. Do we care?
  //     .then((res) => res.json())
  //     .then((petInfo) => {
  //       const currentPet = Object.assign({}, petInfo); //creates new copy of pet obj
  //       return this.setState({ currentPet: currentPet }); // ** DOUBLE CHECK
  //     })
  //     .catch((err) => console.log('err in returning chosen pet data'));
  // };
  //GET request for data corresponding to chosen pet ID;
  // setState: state.currentPet assigned to response obj body (this should be chosen pet's pet document data from DB)
  // COMPONENT DID MOUNT PLAN (NOT USING)
  // setState: state.chosenPet = selected pet ID
  //   redirect to home page (this will trigger componentDidMount, which sends fetch request to get pet data for chosenPet
  //

  createPet = () => {};
  // POST request with req.body containing all inputted text
  // if successful, send back updated user data
  // setState: state.user assigned value of user data (this will cause page to re-render with new pet added to ChooseCreatePetPage)
  createEvent = () => {};
  // POST request with req.body containing inputted event data
  // if successful, send back updated current pet document data
  // setState: state.currentPet assigned to new pet data

  // Questions:
  // how to implement delete functionality for pets, pet attributes, and events?
  // when editing an already-existing pet, how to populate all of the input fields with values from currentPet state?
  // Is it okay that all of these API requests are occuring in state methods rather than onComponentDidMount? Will there be rendering/synchronicity issues?

  render() {
    console.log('rendering app');
    // if (!this.state.IsDataLoaded) {
    //   return (
    //     <div>
    //       <h1>Loading data, please wait...</h1>
    //     </div>
    //   );
    // }
    return (
      <div className='router'>
        <main>
          <h1>Wunderpets</h1>
          <Routes>
            <Route
              exact
              // landing route - condition render depending on whether user is logged in
              path='/landing'
              element={
                // if user data is nonexistent, route to login page
                // otherwise, go to pet selection page

                // this.state.user ? (
                //   <ChooseCreatePetPage
                //     // state = user object; array of their pets is property of that object
                //     user={this.state.user}
                //     // no state necessary for login/signup
                //   />
                // ) :
                // (
                <LoginSignupPage
                  attemptLogin={this.attemptLogin}
                  failedLoginAttempt={this.state.failedLoginAttempt}
                />
                // )
              }
            />
            <Route
              exact
              // what's the endpoint for different pets from the same user? parameterized names?
              // change as needed
              path='/home'
              element={
                <HomePage
                  user={this.state.user}
                  // object with all records for currently selected pet
                  currentPet={this.state.currentPet}
                />
              }
            />
            <Route
              exact
              path='/create'
              element={
                // if failedLoginAttempt is true, then redirect to /landing
                // else render CreateUpdatePet
                <CreateUpdatePet
                  // get user from state so we can list their pet(s)
                  user={this.state.user}
                  // if updating pet, current pet props will be needed; get them from state
                  // if creating a new pet, currentpet won't matter
                  currentPet={this.state.currentPet}
                  // method to set currentpet in state
                  // method to create new pet in user's acct
                  choosePet={this.state.choosePet}
                  createPet={this.state.createPet}
                />
              }
            />
            <Route
              exact
              path='/choose'
              element={
                this.state.failedLoginAttempt ? (
                  <LoginSignupPage
                    attemptLogin={this.attemptLogin}
                    failedLoginAttempt={this.state.failedLoginAttempt}
                  />
                ) : (
                  <ChooseCreatePetPage
                    user={this.state.user}
                    choose={() => this.choosePet(e)}
                  />
                )
              }
            />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
