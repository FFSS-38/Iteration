import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginSignupPage from './components/LoginSignupPage'
import HomePage from '.components/HomePage'
import ChooseCreatePetPage from '.components/ChooseCreatePetPage'
  
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

import './client/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      currentPet: {},
      isDataLoaded: false, 
    };
    

    // this is where we bind methods to this
    this.attemptLogin = this.attemptLogin.bind(this);  
    this.choosePet = this.choosePet.bind(this);
    this.createPet = this.createPet.bind(this);   
  }



  
  attemptLogin = () => { }
  choosePet = () => { } // loading data for the chosen pet will happen in ComponentDidMount 
  createPet = () => { }
  
  
      // updateCreatePetInfo: => takes in input name and updates associated key with user input?
      // create conditional for scheduledEvents => this should push input value to scheduledEvents array
        // how do we delete or update specific scheduledEvents?
        // Where is vetID created? Is it just vet's name? 

  render() {
    if (!this.state.IsDataLoaded)
      return (
        <div>
          <h1>Loading data, please wait...</h1>
        </div>
      );
    return (
      <div className='router'>
        <main>
          <Switch>
            <Route
              exact
              // landing route - condition render depending on whether user is logged in
              path='/'
              component={() => 
                // if user data is nonexistent, route to login page
                // otherwise, go to pet selection page
              (this.state.user ? <ChooseCreatePetPage 
                // state = user object; array of their pets is property of that object
                user={this.state.user} 
                // no state necessary for login/signup
              /> : <LoginSignupPage
                attemptLogin={this.state.attemptLogin}
              />) 
              }
            /> 
            <Route
              exact
              // what's the endpoint for different pets from the same user? parameterized names? 
              // change as needed
              path='/home'
              component={() => (
                <HomePage 
                  user={this.state.user}
                  // object with all records for currently selected pet
                  currentPet={this.state.currentPet} />
              )}
            />
            <Route
              exact
              path='/create'
              component={() => (
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
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
} 


export default App;
