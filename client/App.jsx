import React, { Component } from 'react';
import { Switch, Routes, Route } from 'react-router-dom';

import LoginSignupPage from './components/LoginSignupPage';
import HomePage from './components/HomePage';
import ChooseCreatePetPage from './components/ChooseCreatePetPage';

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
        arrayofPets: []
      }
*/

import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      currentPet: {},
      isDataLoaded: false,
      failedLoginAttempt: false,
    };

    // this is where we bind methods to this
    this.attemptLogin = this.attemptLogin.bind(this);
    this.choosePet = this.choosePet.bind(this);
    this.createPet = this.createPet.bind(this);
  }

  attemptLogin = () => {};
  // ? Are we using OAuth? If not, send POST request with userName and password in request body
  // on response:
  // is user is not authenticated
  // setState failedLoginAttempt set to true (this triggers conditional rendering of "please try again or sign up");
  // if user is authenticated, server should redirect to the /create endpoint (this will trigger this route?) and send user document
  // setState: state.failedLoginAttempt to false (this returns to default, conditionally rendered div will not render)
  // setState: state.user assigned value of response obj body (user document data)
  choosePet = () => {};
  //GET request for data corresponding to chosen pet ID;
  // setState: state.currentPet assigned to response obj body (this should be chosen pet's pet document data from DB)
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
          <Routes>
            <Route
              exact
              // landing route - condition render depending on whether user is logged in
              path='/landing'
              element={
                // if user data is nonexistent, route to login page
                // otherwise, go to pet selection page
                this.state.user ? (
                  <ChooseCreatePetPage
                    // state = user object; array of their pets is property of that object
                    user={this.state.user}
                    // no state necessary for login/signup
                  />
                ) : (
                  <LoginSignupPage attemptLogin={this.state.attemptLogin} />
                )
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
                <ChooseCreatePetPage
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
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
