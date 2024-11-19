import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour';
import moment from 'moment';

import './day.scss';

const Day = ({ dataDay, dayEvents, setEvents }) => {
  const [newTime, setNewTime] = useState(new Date());
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNewTime(new Date());
      // console.log(newTime);
    }, 1000 * 60)
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  const newTop = moment(newTime).hours() * 60 + moment(newTime).minutes();

  return (
    <div className="calendar__day" data-day={dataDay}>
      {dataDay === new Date().getDate()
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
