import React, { Component } from 'react';
import { useState } from 'react';

import ProfileContainer from './ProfileContainer';
import ScheduleContainer from './ScheduleContainer';
import { NotebookContainer } from './NotebookContainer';

const HomePage = (props) => {
  const currentPet = props.currentPet;
  return (
    <div className='homepageContainer'>
      <div className='petNameBanner'>{currentPet.Name}'s Homepage</div>
      <ProfileContainer
        className='profileContainer'
        age={currentPet.Age}
        avatar={currentPet.Avatar}
        breed={currentPet.Breed}
        lastVisit={currentPet.lastVisit}
        // owner={user.name}
        owner={'Mr. Wunderpus'}
        vetID={currentPet.VetID}
        weight={currentPet.Weight}
      />
      <ScheduleContainer
        className='scheduleContainer'
        schedule={currentPet.scheduledEvents}
      />
      <NotebookContainer className='notebookContainer' petObj={currentPet} />
    </div>
  );
};
export default HomePage;

/*
// homepage-specific methods here?
// database call here?

// class HomePage extends Component {
//   //I don't think we need constructor(props) / super(props) here because state doesn't live in this component

//   render() {
//     console.log('hi from homepage');
//     console.log(this.props.currentPet);
//     //const { user, currentPet } = this.props;

//     const currentPet = this.props.currentPet;
//     // adding some dummy text to make sure things are rendering even without data from db
//     return (
//       <div className="homepageContainer">
//         <div className="petNameBanner">{currentPet.Name}'s Homepage</div>
//         <ProfileContainer
//           className="profileContainer"
//           age={currentPet.Age}
//           avatar={currentPet.Avatar}
//           breed={currentPet.Breed}
//           lastVisit={currentPet.lastVisit}
//           // owner={user.name}
//           owner={'Mr. Wunderpus'}
//           vetID={currentPet.VetID}
//           weight={currentPet.Weight}
//         />
//         <ScheduleContainer
//           className="scheduleContainer"
//           schedule={currentPet.scheduledEvents}
//         />
//         <NotebookContainer
//           className="notebookContainer"
//           notes={currentPet.notes}
//         />
//       </div>
//     );
//   }
// }

 */
