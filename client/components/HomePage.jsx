import React, { Component } from 'react';
import { useState } from 'react';

import ProfileContainer from './ProfileContainer';
// import ScheduleContainer from './ScheduleContainer';
import { NotebookContainer } from './NotebookContainer';

const HomePage = (props) => {
  const currentPet = props.currentPet;
  return (
    <div className="homepageContainer">
      <div className="petNameBanner">{currentPet.Name}'s Homepage</div>
      <ProfileContainer
        className="profileContainer"
        age={currentPet.Age}
        avatar={currentPet.URL}
        breed={currentPet.Breed}
        // lastVisit={currentPet.lastVisit}
        // owner={user.name}
        owner={currentPet.Owner}
        vetID={currentPet.Vet}
        weight={currentPet.Weight}
        user={props.user}
        _id={currentPet._id}
      />
      {/* <ScheduleContainer
        className='scheduleContainer'
        petObj={currentPet}
        schedule={currentPet.scheduledEvents}
      /> */}
      <NotebookContainer className="notebookContainer" petObj={currentPet} />
    </div>
  );
};
export default HomePage;
