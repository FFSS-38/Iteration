import React, { Component } from 'react';
import { useState } from 'react';

const ScheduleContainer = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date1 = new Date();
  const date2 = new Date('December 17, 2023 03:24:00');

  renderScheduleItem = (item) => {
    const currentTime = new Date().toDateString();
    return (
      // add a variable for styling past events differently?
      <div className="scheduleItem" key={item}>
        <div className="dateTime">{item.dateTime}</div>
        <div className="eventDetails">{item.details}</div>
        {/* add onclick functionality to delete schedule item*/}
        <button>Delete Event</button>
      </div>
    );
  };
  events = [
    {
      dateTime: date1.toLocaleString(undefined, options),
      details: 'event 1',
    },
    { dateTime: date2.toLocaleString(undefined, options), details: 'event 2' },
  ];

  // datetime formatting and naming tbd
  console.log('hi from sched container');
  // sort schedule items by date
  // shallow copy list of events because I'm afraid of trying to sort state in place
  //let events = this.props.schedule.slice();
  events.sort((a, b) => {
    return b.dateTime - a.dateTime;
  });

  // make a renderable list of schedule item components
  const eventList = [];
  events.forEach((el) => eventList.push(renderScheduleItem(el)));
  console.log(eventList);

  return (
    <div className="homeCategory">
      <h2>Schedule rendering</h2>
      <div>{eventList}</div>
    </div>
  );
};
export default ScheduleContainer;
