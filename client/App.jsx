import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import HomePage from './components/HomePage';
import DisplayPet from './components/DisplayPet';
import CreatePet from './components/CreatePet';
import './styles.css';
import SignupPage from './components/SignupPage';
import { DisplayNotes } from './components/NotebookContainer';

const App = () => {
  // initial state
  const [user, setUser] = useState({});

  const [petList, setPetList] = useState([]);

  const [currentPet, setCurrentPet] = useState({});

  const [failedLoginAttempt, setFailedLoginAttempt] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const attemptLogin = (username, password) => {
    const endpoint = `http://localhost:3000/api/connect/`;
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: username, Password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setUser(data[0]);
          console.log(user);
          setPetList(data[1]);
          console.log(petList);
          setFailedLoginAttempt(false);
        } else {
          setFailedLoginAttempt(true);
        }
      });
  };

  const choosePet = (e) => {
    console.log(e);
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

  const createEvent = () => {};

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="router">
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Login
                  attemptLogin={attemptLogin}
                  failedLoginAttempt={failedLoginAttempt}
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <SignupPage
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              exact
              path="/home"
              element={<HomePage user={user} currentPet={currentPet} />}
            />
            <Route
              exact
              path="/create"
              element={<CreatePet user={user} setPetList={setPetList} />}
            />
            <Route
              exact
              path="/choose"
              element={
                <DisplayPet
                  petList={petList}
                  choose={() => this.choosePet()}
                  setCurrentPet={setCurrentPet}
                />
              }
            />
            <Route
              exact
              path="/notes"
              element={<DisplayNotes petObj={currentPet} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
