import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

const staticEvents = Object.assign([], events);

const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

function Calendar({ modalVisible, handleClose, weekDates, makeModalInvisible }) {
  const [stateEvents, setStateEvents] = useState(staticEvents);
  const [stateServer, setStateServer] = useState(1);


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

  // Загрузка данных с сервера
  const fetchTasksList = () => {
    fetch(baseUrl).then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .then(taskList => {
        setStateServer(2);
        console.log(taskList);
        console.log(stateEvents);
        console.log(stateServer);
        console.log(taskList[0].dateFrom);
        console.log(taskList[0].dateTo);
        // stateServer.map(task => {
        //   console.log(new Date(task.dateFrom));
        //   console.log(new Date(task.dateTo));
        // })
      });
  }

  const createData = () => {
    const newTask = {
      // id: 3,
      title: '',
      description: '',
      dateFrom: new Date(2024, 10, 8, 10, 30),
      dateTo: new Date(2024, 10, 8, 11, 30),
    }

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    }).then(response => {
      if (response.ok) {
        fetchTasksList();
      } else {
        throw new Error('Failed to create task');
      }
    })
  }
  // Конец загрузки данных с сервера

  const handleDeleteEvent = (id) => {
    console.log(id);
    const updatedData = stateEvents
      .filter(data => data.id !== id)

    setStateEvents(updatedData);
  }

  return (
    <section className="calendar">
      <button onClick={createData}>MochAPI Data</button>
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          {modalVisible
            && <Modal
              handleClose={handleClose}
              onCreate={onCreate}
            />}
          <Sidebar onCreate={createData} />
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
