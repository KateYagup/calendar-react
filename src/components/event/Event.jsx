import React, { useState } from 'react';
import { getEvents, deleteEvent } from '../../common/gateway/index.js';
// import { events } from '../../../src/gateway/events.js';
import moment from 'moment';

import './event.scss';
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

const Event = ({ id, height, marginTop, title, time, description, dateFrom, setEvents, events, hourEvents }) => {

  const [showDelete, setShowDelete] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  // console.log(events[0].dateFrom);
  // const { dateFrom, dateTo } = hourEvents;
  // console.log('dateFrom ' + events.dateFrom);



  const onDelete = () => {
    if (moment(dateFrom).diff(moment(), 'minutes') < 15) {
      alert('The event cannot be deleted less then 15 minutes before it starts');
      return setShowDelete(false);
    }
    deleteEvent(id).then(() => getEvents().then(setEvents));
  }

  // Удаление ивента
  // const handleDeleteEvent = (id) => {
  //   fetch(`${baseUrl}/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         fetch(baseUrl).then(res => {
  //           if (res.ok) return res.json();
  //         }).then(taskList => {
  //           setEvents(taskList);
  //         }
  //         );
  //       } else {
  //         throw new Error('Failed to create task');
  //       }
  //     })
  // }


  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  }

  return (
    <div style={eventStyle} className="event"
      onClick={handleShowDelete}
    >
      {showDelete && <button
        className='delete-event-btn'
        // onClick={() => onDelete(id)}
        onClick={() => onDelete()}
      >
        Delete
      </button>}
      {/* <div>{id}</div> */}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div>{description}</div>
    </div>
  );
};

export default Event;

