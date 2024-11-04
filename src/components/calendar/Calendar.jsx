import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

// const newEvents = events.slice();

const newEvent = [{
  id: 8,
  title: ' text.title',
  description: 'text.description',
  dateFrom: new Date(2024, 10, 2, 10, 30),
  dateTo: new Date(2024, 10, 2, 11, 30),
}];

const allEvents = events.concat(newEvent);

function Calendar({ modalVisible, handleClose, weekDates }) {
  const [state, setState] = useState({ events });

  const onCreate = text => {
    console.log('text!!!');
    console.log(text);
    const { tasks } = this.state;
    console.log(tasks);
    const newText = [{
      id: 8,
      title: ' text.title',
      description: 'text.description',
      dateFrom: new Date(2024, 11, 2, 10, 30),
      dateTo: new Date(2024, 11, 2, 11, 30),
    }];

    const updatedTasks = events.concat(newText);
    console.log(updatedTasks);
    setState(newText);
  }

  const handleThisClick = () => {
    console.log('handleThisClick');
    const newEvent = [{
      id: 8,
      title: ' text.title',
      description: 'text.description',
      dateFrom: new Date(2024, 10, 4, 10, 30),
      dateTo: new Date(2024, 10, 4, 11, 30),
    },];

    setState(newEvent);
  }

  {
    // const { weekDates } = this.props;

    return (
      <section className="calendar">
        <button onClick={handleThisClick}>!!!!!</button>
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            {modalVisible && <Modal handleClose={handleClose}
              onCreate={onCreate} />}
            {/* <Modal handleClose={this.props.handleClose} handleInfo={this.props.handleInfo} /> */}
            <Sidebar />
            <Week weekDates={weekDates} events={events} />
            {/* <button onClick={handleThisClick}>Chane</button> */}

          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
