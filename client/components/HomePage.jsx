import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProfileContainer from './ProfileContainer';
import ScheduleContainer from './ScheduleContainer';
import NotebookContainer from './NotebookContainer';

// homepage-specific methods here?
// database call here?

class HomePage extends Component {
  //I don't think we need constructor(props) / super(props) here because state doesn't live in this component

  render() {
    console.log('hi from homepage');
    const { user, currentPet } = this.props;

    // adding some dummy text to make sure things are rendering even without data from db
    return (
      <container className='homepageContainer'>
        <div className='petNameBanner'>{currentPet.name}'s Homepage</div>
        <ProfileContainer
          className='profileContainer'
          age={currentPet.age}
          avatar={currentPet.avatar}
          breed={currentPet.breed}
          lastVisit={currentPet.lastVisit}
          owner={user.name}
          vetID={currentPet.vetID}
          weight={currentPet.weight}
        />
        <ScheduleContainer
          className='scheduleContainer'
          schedule={currentPet.scheduledEvents}
        />
        <NotebookContainer
          className='notebookContainer'
          notes={currentPet.notes}
        />
      </container>
    );
  }
}

export default HomePage;
