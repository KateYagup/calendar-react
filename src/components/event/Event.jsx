import React, { useState } from 'react';
import moment from 'moment';

import './event.scss';
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

const Event = ({ id, height, marginTop, title, time, description, setEvents, hourEvents }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const { dateFrom, dateTo } = hourEvents;

  const [showDelete, setShowDelete] = useState(false)

  // const onDelete = (id) => {
  //   handleDeleteEvent(id);
  // }


  // Удаление ивента
  const handleDeleteEvent = (id) => {

    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          fetch(baseUrl).then(res => {
            if (res.ok) return res.json();
          }).then(taskList => {
            setEvents(taskList);
          }
          );
        } else {
          throw new Error('Failed to create task');
        }
      })
  }

  const onDelete = (): void => {
    if (moment(dateFrom).diff(moment(), 'minutes') < 15) {
      alert(errorMessage.delete);
      return setIsDeleteButtonVisible(false);
    }
    handleDeleteEvent(id).then(() => getEvents().then(setEvents));
  }

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
    console.log(showDelete);
  }

  return (
    <div style={eventStyle} className="event"
      onClick={handleShowDelete}
    >
      {showDelete && <button
        className='delete-event-btn'
        // onClick={() => onDelete(id)}
        onClick={() => handleDeleteEvent(id)}
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

