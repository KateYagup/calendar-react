import React from 'react';
import Day from '../day/Day';


import './week.scss';

const Week = ({ weekDates, events }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );
        console.log('events!!!');
        console.log(events);
        console.log('dayStart!!!');
        console.log(dayStart);
        events.map(event => {
          console.log('!!!!!!!!');
          console.log(event.dateFrom);
          console.log(dayStart);
        })
        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );
        console.log(dayEvents);
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;
