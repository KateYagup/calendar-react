import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

// const staticEvents = Object.assign([], events);
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

function Calendar({ weekDates, events, setEvents }) {

  // Удаление ивента
  const handleDeleteEvent = (id) => {
    // const id1 = Number(id);
    console.log(events);
    console.log(events.id);
    const permitDel = true;

    events.map(event => {
      if ((event.id === id)) {

        if ((new Date()).getTime() > Date.parse(event.dateFrom)) {
          debugger;
          permitDel = false;
          console.log('!!!');
        }
        const timeDifference = (new Date()).getTime() - Date.parse(event.dateFrom);
        console.log('timeDifference ' + timeDifference);
        // if (Date.parse(event.dateFrom) - (new Date()).getTime() > 60 * 1000) {
        //   // console.log(event.dateFrom);
        //   permitDel = true;
        //   console.log(id);
        console.log((new Date()).getTime());
        console.log(Date.parse(event.dateFrom));
        // }
      }
    })
    // if (permitDel) alert('!!!');
    if (permitDel) {
      fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            fetch(baseUrl).then(res => {
              if (res.ok) return res.json();
            }).then(taskList => {
              setEvents(taskList);
              // console.log(taskList);
            }
            );
          } else {
            throw new Error('Failed to create task');
          }
        })
    }
    if (!permitDel) {
      alert('You can t delete this event')
    }

  }

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            handleDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
