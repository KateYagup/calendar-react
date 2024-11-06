import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

const staticEvents = Object.assign([], events);


// const newEvent = [{
//   id: 8,
//   title: ' text.title',
//   description: 'text.description',
//   dateFrom: new Date(2024, 10, 2, 10, 30),
//   dateTo: new Date(2024, 10, 2, 11, 30),
// }];

// const allEvents = events.concat(newEvent);

function Calendar({ modalVisible, handleClose, weekDates, makeModalInvisible }) {
  const [stateEvents, setStateEvents] = useState(staticEvents);

  const onCreate = text => {
    text['id'] = Math.random();
    const dateTimeFrom = new Date(Date.parse(text.date + 'T' + text.startTime));
    const dateTimeTo = new Date(Date.parse(text.date + 'T' + text.endTime));

    text['dateFrom'] = dateTimeFrom;
    text['dateTo'] = dateTimeTo;
    const updatedTasks = stateEvents.concat([text]);
    setStateEvents(updatedTasks);
    // staticEvents = Object.assign([], staticEvents);
  }

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          {modalVisible
            && <Modal
              handleClose={handleClose}
              onCreate={onCreate}
            />}
          <Sidebar />
          <Week weekDates={weekDates} events={stateEvents} />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
