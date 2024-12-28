import React, { useState } from 'react';
import { getEvents, deleteEvent } from '../../common/gateway/index.js';
import moment from 'moment';
import './event.scss';

const Event = ({ id, height, marginTop, title, time, description, dateFrom, setEvents }) => {

  const [showDelete, setShowDelete] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  const onDelete = () => {
    if (moment(dateFrom).diff(moment(), 'minutes') < 15) {
      alert('The event cannot be deleted less then 15 minutes before it starts');
      return setShowDelete(false);
    }
    deleteEvent(id).then(() => getEvents().then(setEvents));
  }

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  }

  return (
    <div style={eventStyle} className="event"
      onClick={handleShowDelete}
    >
      {showDelete && <button
        className='delete-event-btn'
        onClick={() => onDelete()}
      >
        Delete
      </button>}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div>{description}</div>
    </div>
  );
};

export default Event;

