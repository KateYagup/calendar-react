import React from 'react';
import Hour from '../hour/Hour';
import moment from 'moment';

import './day.scss';

const Day = ({ dataDay, dayEvents, handleDeleteEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {dataDay === new Date().getDate()
        && <div
          className='line'
          // style={{ top: '500px' }}
          style={{ marginTop: moment().hours() * 60 + moment().minutes() }}
        >
        </div>}
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            handleDeleteEvent={handleDeleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Day;
