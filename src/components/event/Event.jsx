import React, { useState } from 'react';

import './event.scss';

const Event = ({ id, height, marginTop, title, time, handleDeleteEvent }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [showDelete, setShowDelete] = useState(false)

  const onDelete = (id) => {
    handleDeleteEvent(id);
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
        onClick={() => onDelete(id)}
      >
        Delete
      </button>}
      <div>{id}</div>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;

