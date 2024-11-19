import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

// const staticEvents = Object.assign([], events);
// const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

function Calendar({ weekDates, events, setEvents }) {

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            setEvents={setEvents}
          />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
