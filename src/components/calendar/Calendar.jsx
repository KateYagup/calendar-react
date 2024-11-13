import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

const staticEvents = Object.assign([], events);

function Calendar({ modalVisible, handleClose, weekDates, makeModalInvisible, events }) {
  const [stateEvents, setStateEvents] = useState(events);
  // console.log(events);
  console.log('stateEvents');
  console.log(events);
  console.log(stateEvents);
  // const [stateEvents, setStateEvents] = useState(staticEvents);
  // const [stateServer, setStateServer] = useState(1);


  // Создание нового ивента
  const onCreate = text => {
    text['id'] = Math.random();
    const dateTimeFrom = new Date(Date.parse(text.date + 'T' + text.startTime));
    const dateTimeTo = new Date(Date.parse(text.date + 'T' + text.endTime));
    text['dateFrom'] = dateTimeFrom;
    text['dateTo'] = dateTimeTo;
    const updatedTasks = stateEvents.concat([text]);
    setStateEvents(updatedTasks);
  }

  const handleDeleteEvent = (id) => {
    console.log(id);
    const updatedData = stateEvents
      .filter(data => data.id !== id)
    setStateEvents(updatedData);
  }

  return (
    <section className="calendar">
      {/* <button onClick={createData}>MochAPI Data</button> */}
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          {modalVisible
            && <Modal
              handleClose={handleClose}
              onCreate={onCreate}
            />}
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={stateEvents}
            handleDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
