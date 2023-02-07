import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const date1 = new Date();
const date2 = new Date('December 17, 2023 03:24:00');

class ScheduleContainer extends Component {
  renderScheduleItem = (item) => {
    // const currentTime = Date.now();
    return (
      // add a variable for styling past events differently?
      <div className='scheduleItem' key={item}>
        <div className='dateTime'>{item.dateTime}</div>
        <div className='eventDetails'>{item.details}</div>
        {/* add onclick functionality to delete schedule item*/}
        <button>Delete Event</button>
      </div>
    );
  };

  // test object to make sure we can render -- remove once fetch is successful
  // ALSO remove, at that point, "this" from instances of "this.events" below

  events = [
    {
      dateTime: date1.toLocaleString(undefined, options),
      details: 'event 1',
    },
    { dateTime: date2.toLocaleString(undefined, options), details: 'event 2' },
  ];

  render() {
    // datetime formatting and naming tbd
    console.log('hi from sched container');
    // sort schedule items by date
    // shallow copy list of events because I'm afraid of trying to sort state in place
    //let events = this.props.schedule.slice();
    this.events.sort((a, b) => {
      return b.dateTime - a.dateTime;
    });

    // make a renderable list of schedule item components
    const eventList = [];
    this.events.forEach((el) => eventList.push(this.renderScheduleItem(el)));
    console.log(eventList);

    return (
      <div className='homeCategory'>
        <h2>Schedule rendering</h2>
        <div>{eventList}</div>
      </div>
    );
  }
}

export default ScheduleContainer;
