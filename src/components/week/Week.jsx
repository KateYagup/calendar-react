import React from 'react';
import Day from '../day/Day';
import moment from 'moment';


import './week.scss';

const Week = ({ weekDates, events, setEvents }) => {

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        // Формуємо івенти на поточний день
        const dayEvents1 = events.filter(
          (event) => {
            // return new Date(event.dateFrom) > dayStart && new Date(event.dateTo) < dayEnd;
            return Date.parse(event.dateFrom) > dayStart.getTime() && Date.parse(event.dateTo) < dayEnd;
          }
        );

        // const dayEvents = events.filter(
        //   (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        // );

        return (
          <Day
            key={dayStart.getDate()}
            events={events}
            setEvents={setEvents}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents1}
          />
        );
      })}
    </div>
  );
};

export default Week;
