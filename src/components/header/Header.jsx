import React from 'react';
import moment from 'moment';

import './header.scss';
import { getWeekStartDate, months } from '../../common/utils/dateUtils';

const Header = ({ weekStartDate, setWeekStartDate, handleModal }) => {
  const firstDayOfWeek = getWeekStartDate(weekStartDate);
  const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + 10000 * 360 * 24 * 6);

  const month = (firstDayOfWeek.getMonth() === lastDayOfWeek.getMonth())
    ? `${months[firstDayOfWeek.getMonth()].slice(0, 3)} ${firstDayOfWeek.getFullYear()}`
    : `${months[firstDayOfWeek.getMonth()].slice(0, 3)} - ${months[lastDayOfWeek.getMonth()].slice(0, 3)} ${firstDayOfWeek.getFullYear()}`;

  const handleNextWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).add(7, 'days').format()));
  }

  const handlePreviuosWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).add(-7, 'days').format()));
  }

  const handleCurrentWeek = () => {
    setWeekStartDate(new Date());
  }

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handleModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleCurrentWeek}>Today</button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handlePreviuosWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handleNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{month}</span>
      </div>
    </header>
  );
};

export default Header;
