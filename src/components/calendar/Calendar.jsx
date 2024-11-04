import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

const staticEvents = Object.assign([], events);


function Calendar({ modalVisible, handleClose, weekDates }) {
  const [stateEvents, setStateEvents] = useState(staticEvents);

  const onCreate = text => {
    const updatedTasks = stateEvents.concat(text);
    console.log(updatedTasks);
    setStateEvents(updatedTasks);
  }

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          {modalVisible && <Modal handleClose={handleClose}
            onCreate={onCreate} />}
          {/* <Modal handleClose={this.props.handleClose} handleInfo={this.props.handleInfo} /> */}
          <Sidebar />
          <Week weekDates={weekDates} events={stateEvents} />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
