import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

const staticEvents = Object.assign([], events);
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

function Calendar({ modalVisible, handleClose, weekDates,
  makeModalInvisible, events, handleEvents, onCreate,
  formState, setFormState }) {
  // const [stateEvents, setStateEvents] = useState(events);

  // Создание нового ивента
  // const onCreate = text => {
  //   text['id'] = Math.random();
  //   const dateTimeFrom = new Date(Date.parse(text.date + 'T' + text.startTime));
  //   const dateTimeTo = new Date(Date.parse(text.date + 'T' + text.endTime));
  //   text['dateFrom'] = dateTimeFrom;
  //   text['dateTo'] = dateTimeTo;
  //   // text['description'] = 'Description of text';
  //   // text['title'] = 'This is a title';
  //   const updatedTasks = stateEvents.concat([text]);
  //   setStateEvents(updatedTasks);
  // }

  // Удаление ивента
  const handleDeleteEvent = (id) => {
    // console.log(id);
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })
    // const updatedData = stateEvents
    //   .filter(data => data.id !== id)
    // setStateEvents(updatedData);
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
              handleEvents={handleEvents}
              formState={formState}
              setFormState={formState}
            />}
          <Sidebar />
          <Week
            weekDates={weekDates}
            // events={stateEvents}
            events={events}
            handleDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
