import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour';
import moment from 'moment';

import './day.scss';

const Day = ({ dataDay, dayEvents, events, setEvents, currentDay }) => {
  const [newTime, setNewTime] = useState(new Date());
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNewTime(new Date());
    }, 1000 * 60)
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  const newTop = moment(newTime).hours() * 60 + moment(newTime).minutes();

  return (
    <div className="calendar__day" data-day={dataDay}>
      {moment(currentDay).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
        && <div
          className='line'
          style={{ top: newTop }}
        >
        </div>}
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            events={events}
            setEvents={setEvents}
            dataHour={hour}
            hourEvents={hourEvents}
          />
        );
      })}
    </div>
  );
};

export default Day;
