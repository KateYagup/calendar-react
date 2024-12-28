import React from 'react';
import moment from 'moment';

import { days } from '../../common/utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  const today = new Date();
  const todayDate = today.getDate();

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        < div className="calendar__day-label day-label" >
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span className={`'day-label__day-number'
           ${moment().format('YYYY-MM-DD') === moment(dayDate).format('YYYY-MM-DD')
              ? 'day-label__today-number'
              : ''}`}>{dayDate.getDate()}
          </span>
        </div>
      ))
      }
    </header >
  );
};

export default Navigation;
