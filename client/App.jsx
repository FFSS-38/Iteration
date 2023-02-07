import React, { Component, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginSignupPage from './components/LoginSignupPage';
import HomePage from './components/HomePage';
import ChooseCreatePetPage from './components/ChooseCreatePetPage';
import CreateUpdatePet from './components/CreateUpdatePet';
import './styles.css';



// class App extends Component {
//   constructor(props) {
//     super(props);

//     //
//     // const petSchema = new Schema({
//     //   Name: { type: String, required: true },
//     //   Age: { type: Number },
//     //   Avatar: { type: String },
//     //   Notes: { type: String },
//     //   Weight: { type: Number },
//     //   Breed: { type: String },
//     //   LastVisit: { type: Date },
//     //   ScheduledEvents: { type: String },
//     //   AssignedVet: { type: Object },
//     //   Owner: { type: String, required: true },
//     // });

//     //These state properties are hard-coded in because of last-minute troubles with mongoDB - ideally these state properties would be empty initially
//     this.state = {
//       user: {
//         _id: '63deb75993ddb845fa889e0a',
//         Name: 'Pierre',
//         Password: 'Jacquemin',
//       },
//       petList: [
//         {
//           _id: '63e1523fa559f05e7fe59fcb',
//           Age: 17,
//           Breed: 'Belgium Cat',
//           Avatar: 'http://localhost:3000/client/images/cat1.png',
//           Notes: 'Seems to have kitty dementia',
//           Weight: 3451,
//           Name: 'Eden',
//           Owner: '63e1213bcb9b9423d0ba43a7',
//           __v: 0,
//         },
//         {
//           _id: '63e153d4a559f05e7fe59fd4',
//           Name: 'Simba',
//           Breed: 'Basic Cat',
//           Avatar: 'http://localhost:3000/client/images/cat2.png',
//           Weight: 2000,
//           Age: 15,
//           Notes: 'Ate 2.5 feet of yarn on Saturday, seems fine though',
//           Owner: '63e1213bcb9b9423d0ba43a7',
//           __v: 0,
//         },
//         {
//           _id: '63e1562d5f1fe419944e6baf',
//           Name: 'Zola',
//           Breed: 'Shiba Inu',
//           Avatar: 'http://localhost:3000/client/images/dog3.png',
//           Weight: 2000,
//           Owner: '63e1213bcb9b9423d0ba43a7',
//           __v: 0,
//         },
//       ], // an array that contains objects (each pet's data)
//       currentPet: {
//         _id: '63e153d4a559f05e7fe59fd4',
//         Name: 'Simba',
//         Breed: 'Basic Cat',
//         Weight: 2000,
//         Age: 15,
//         Notes: 'Ate 2.5 feet of yarn on Saturday, seems fine though',
//         Owner: '63e1213bcb9b9423d0ba43a7',
//         lastVisit: 'Dec 14, 2022',
//         VetID: 'Dr. Tucker, Stratford Hills Veterinary Center',
//         __v: 0,
//       },

//       failedLoginAttempt: false,
//       // chosenPet: 0, // this will be petID
//     };

//     // this is where we bind methods to this
//     this.attemptLogin = this.attemptLogin.bind(this);
//     this.choosePet = this.choosePet.bind(this);
//     this.createOrUpdatePet = this.createOrUpdatePet.bind(this);
//   }

//   // attemptLogin: send POST request with userName and password in request body
//   // on response:
//   //   is user is not authenticated
//   //    setState: failedLoginAttempt set to true (this triggers conditional rendering of "please try again or sign up");
//   //  if user is authenticated, server should redirect to the /create endpoint (this will trigger this route?) and send user document
//   //    setState: state.failedLoginAttempt to false (this returns to default, conditionally rendered div will not render)
//   //    setState: state.user assigned value of response obj body (user document data)
//   //    setState: state.petList assigned value of response obj body (list of pets)
//   attemptLogin = (username, password) => {
//     console.log(username + '  ' + password);
//     // by request of the backend team, parameterize username
//     // send pw in body of request
//     const endpoint = `http://localhost:3000/api/connect/`;
//     fetch(endpoint, {
//       method: 'POST',
//       //mode: 'no-cors',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ Name: username, Password: password }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         // successful login gives response array: [{userdoc}, [petListwithpetobj]]
//         if (Array.isArray(data)) {
//           // const newUser = Object.assign({}, data[0]);
//           // console.log('new User? ' + newUser);
//           this.setState({ user: data[0] });
//           console.log(this.state.user);
//           this.setState({ petList: data[1] });
//           console.log(this.state.petList);
//           this.setState({ failedLoginAttempt: false });
//         } else {
//           // alert with response string to clarify the problem
//           this.setState({ failedLoginAttempt: true });
//         }
//       });
//   };

//   choosePet = (e) => {
//     // console.log click event for testing purposes
//     console.log(e);
//     // an awkward loop to find the chosen pet is the price of one GET request upon login:
//     for (let pet of this.state.petList) {
//       if (pet._id === e.target.id) {
//         console.log('pet match found: ' + pet.name + ' ' + pet._id);
//         this.setState({ currentPet: pet });
//       }
//     }
//   };

//   createOrUpdatePet = (action) => {
//     console.log(action);
//     const requestBody = {
//       Name: document.querySelector('#newPetName').value,
//       Breed: document.querySelector('#newPetBreed').value,
//       Age: document.querySelector('#newPetAge').value,
//       Weight: document.querySelector('#newPetWeight').value,
//       AssignedVet: document.querySelector('#newPetVet').value,
//       Avatar: document.querySelector('#newAvatarURL').value,
//     };
//     // depending on action from create/update page, make post or patch request
//     if (action === 'Create') {
//       fetch('/pets/', {
//         body: requestBody,
//         method: action === 'Create' ? 'POST' : 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log('stored to db: ' + data);
//         });
//     }
//   };
//   // POST request with req.body containing all inputted text
//   // if successful, send back updated user data
//   // setState: state.user assigned value of user data (this will cause page to re-render with new pet added to ChooseCreatePetPage)
//   createEvent = () => {};
//   // POST request with req.body containing inputted event data
//   // if successful, send back updated current pet document data
//   // setState: state.currentPet assigned to new pet data

//   render() {
//     console.log('rendering app');
//     // if (!this.state.IsDataLoaded) {
//     //   return (
//     //     <div>
//     //       <h1>Loading data, please wait...</h1>
//     //     </div>
//     //   );
//     // }
//     return (
//       <div className="router">
//         <main>
//           <h1>Wunderpets</h1>
//           <Routes>
//             <Route
//               exact
//               // landing route - condition render depending on whether user is logged in
//               path="/landing"
//               element={
//                 // if user data is nonexistent, route to login page
//                 // otherwise, go to pet selection page

//                 // this.state.user ? (
//                 //   <ChooseCreatePetPage
//                 //     // state = user object; array of their pets is property of that object
//                 //     user={this.state.user}
//                 //     // no state necessary for login/signup
//                 //   />
//                 // ) :
//                 // (
//                 <LoginSignupPage
//                   attemptLogin={this.attemptLogin}
//                   failedLoginAttempt={this.failedLoginAttempt}
//                 />
//                 // )
//               }
//             />
//             <Route
//               exact
//               // what's the endpoint for different pets from the same user? parameterized names?
//               // change as needed
//               path="/home"
//               element={
//                 <HomePage
//                   user={this.state.user}
//                   // object with all records for currently selected pet
//                   currentPet={this.state.currentPet}
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/create"
//               element={
//                 // if failedLoginAttempt is true, then redirect to /landing
//                 // else render CreateUpdatePet
//                 <CreateUpdatePet
//                   // get user from state so we can list their pet(s)
//                   user={this.state.user}
//                   // if updating pet, current pet props will be needed; get them from state
//                   // if creating a new pet, currentpet won't matter
//                   currentPet={this.state.currentPet}
//                   // method to set currentpet in state
//                   // method to create new pet in user's acct
//                   choosePet={this.choosePet}
//                   createOrUpdatePet={this.createOrUpdatePet}
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/choose"
//               element={
//                 // this.state.failedLoginAttempt ? (
//                 //   <LoginSignupPage
//                 //     attemptLogin={this.attemptLogin}
//                 //     failedLoginAttempt={this.state.failedLoginAttempt}
//                 //   />
//                 // ) : (
//                 <ChooseCreatePetPage
//                   petList={this.state.petList}
//                   choose={() => this.choosePet(e)}
//                 />
//                 // )
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     );
//   }
// }

const App = () => {
  // initial state
  const [user, setUser] = useState({
    _id: '63deb75993ddb845fa889e0a',
    Name: 'Pierre',
    Password: 'Jacquemin',
  });

  const [petList, setPetList] = useState([
    {
      _id: '63e1523fa559f05e7fe59fcb',
      Age: 17,
      Breed: 'Belgium Cat',
      Avatar: 'http://localhost:3000/client/images/cat1.png',
      Notes: 'Seems to have kitty dementia',
      Weight: 3451,
      Name: 'Eden',
      Owner: '63e1213bcb9b9423d0ba43a7',
      __v: 0,
    },
    {
      _id: '63e153d4a559f05e7fe59fd4',
      Name: 'Simba',
      Breed: 'Basic Cat',
      Avatar: 'http://localhost:3000/client/images/cat2.png',
      Weight: 2000,
      Age: 15,
      Notes: 'Ate 2.5 feet of yarn on Saturday, seems fine though',
      Owner: '63e1213bcb9b9423d0ba43a7',
      __v: 0,
    },
    {
      _id: '63e1562d5f1fe419944e6baf',
      Name: 'Zola',
      Breed: 'Shiba Inu',
      Avatar: 'http://localhost:3000/client/images/dog3.png',
      Weight: 2000,
      Owner: '63e1213bcb9b9423d0ba43a7',
      __v: 0,
    },
  ]);

  const [currentPet, setCurrentPet] = useState({
    _id: '63e153d4a559f05e7fe59fd4',
    Name: 'Simba',
    Breed: 'Basic Cat',
    Weight: 2000,
    Age: 15,
    Notes: 'Ate 2.5 feet of yarn on Saturday, seems fine though',
    Owner: '63e1213bcb9b9423d0ba43a7',
    lastVisit: 'Dec 14, 2022',
    VetID: 'Dr. Tucker, Stratford Hills Veterinary Center',
    __v: 0,
  });

  const [failedLoginAttempt, setFailedLoginAttempt] = useState(false);

  const attemptLogin = (username, password) => {
    console.log(username + '  ' + password);
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
  // setState: state.user assigned value of user data (this will cause page to re-render with new pet added to ChooseCreatePetPage)
 const createEvent = () => {};
  // POST request with req.body containing inputted event data
  // if successful, send back updated current pet document data
  // setState: state.currentPet assigned to new pet data

    return (
      <div className="router">
        <main>
          <h1>Wunderpets</h1>
          <Routes>
            {/* <Route
              exact
              // landing route - condition render depending on whether user is logged in
              path="/landing"
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
                  failedLoginAttempt={failedLoginAttempt}
                />
                // )
              }
            />
            <Route
              exact
              // what's the endpoint for different pets from the same user? parameterized names?
              // change as needed
              path="/home"
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
              path="/create"
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
                  choosePet={this.choosePet}
                  createOrUpdatePet={this.createOrUpdatePet}
                />
              }
            /> */}
            <Route
              exact
              path="/choose"
              element={
                <ChooseCreatePetPage
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
