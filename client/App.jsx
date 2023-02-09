import React, {useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import HomePage from './components/HomePage';
import DisplayPet from './components/DisplayPet';
import CreatePet from './components/CreatePet';
import './styles.css';
import SignupPage from './components/SignupPage';

const App = () => {
  // initial state
  const [user, setUser] = useState({});

  const [petList, setPetList] = useState([]);

  const [currentPet, setCurrentPet] = useState({});

  const [failedLoginAttempt, setFailedLoginAttempt] = useState(false);

  const attemptLogin = (username, password) => {
    // console.log(username + '  ' + password);
    // by request of the backend team, parameterize username
    // send pw in body of request
    const endpoint = `http://localhost:3000/api/connect/`;
    fetch(endpoint, {
      method: 'POST',
      //mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: username, Password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // successful login gives response array: [{userdoc}, [petListwithpetobj]]
        if (Array.isArray(data)) {
          setUser(data[0]);
          console.log(user);
          setPetList(data[1]);
          console.log(petList);
          setFailedLoginAttempt(false);
        } else {
          // alert with response string to clarify the problem
          setFailedLoginAttempt(true);
        }
      });
  };

  const choosePet = (e) => {
    // console.log click event for testing purposes
    console.log(e);
    // an awkward loop to find the chosen pet is the price of one GET request upon login:
    for (let pet of this.state.petList) {
      if (pet._id === e.target.id) {
        console.log('pet match found: ' + pet.name + ' ' + pet._id);
        setCurrentPet(pet);
      }
    }
  };

  const createOrUpdatePet = (action) => {
    console.log(action);
    const requestBody = {
      Name: document.querySelector('#newPetName').value,
      Breed: document.querySelector('#newPetBreed').value,
      Age: document.querySelector('#newPetAge').value,
      Weight: document.querySelector('#newPetWeight').value,
      AssignedVet: document.querySelector('#newPetVet').value,
      Avatar: document.querySelector('#newAvatarURL').value,
    };
    // depending on action from create/update page, make post or patch request
    if (action === 'Create') {
      fetch('/pets/', {
        body: requestBody,
        method: action === 'Create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('stored to db: ' + data);
        });
    }
  };
  // POST request with req.body containing all inputted text
  // if successful, send back updated user data
  // setState: state.user assigned value of user data (this will cause page to re-render with new pet added to CreatePet)
 const createEvent = () => {};
  // POST request with req.body containing inputted event data
  // if successful, send back updated current pet document data
  // setState: state.currentPet assigned to new pet data

    return (
      <div className="router">
        <main>
          <h1>Wunderpets</h1>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Login
                  attemptLogin={attemptLogin}
                  failedLoginAttempt={failedLoginAttempt}
                />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <SignupPage
                user = {user}
                setUser={setUser}
                />
              }
            />
            <Route
              exact
              // what's the endpoint for different pets from the same user? parameterized names?
              // change as needed
              path="/home"
              element={
                <HomePage
                  user={user}
                  // object with all records for currently selected pet
                  currentPet={currentPet}
                />
              }
            />
            <Route
              exact
              path="/create"
              element={
                // if failedLoginAttempt is true, then redirect to /landing
                // else render CreateUpdatePet
                <CreatePet
                  // get user from state so we can list their pet(s)
                  user={user}
                  setPetList = {setPetList}
                  // if updating pet, current pet props will be needed; get them from state
                  // if creating a new pet, currentpet won't matter
                  // currentPet={currentPet}
                  // method to set currentpet in state
                  // method to create new pet in user's acct
                  // choosePet={choosePet}
                  // createOrUpdatePet={createOrUpdatePet}
                />
              }
            />
            <Route
              exact
              path="/choose"
              element={
                <DisplayPet
                  petList={petList}
                  choose={() => this.choosePet()}
                />
              }
            />
          </Routes>
        </main>
      </div>
    );
  }

export default App;
