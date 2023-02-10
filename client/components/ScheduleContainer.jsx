import React, { Component } from 'react';
import { useState, useEffect } from 'react';
const ScheduleContainer = (props) => {
  const { Pet } = props.petObj;
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('/pet/visits', {
      method: 'POST',
      body: JSON.stringify({
        Pet,
      }),
    }).then((results) => {
      setSchedule(results);
    });
  }, []);
  return (
    <div>
      <ul>
        {schedule.map((visit, i) => {
          <li>
            <h4>{visit.Date}</h4>
            <p>Reason: {visit.Reason}</p>
          </li>;
        })}
      </ul>
    </div>
  );
};
export default ScheduleContainer;
