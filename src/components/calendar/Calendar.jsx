import React, { Component } from 'react';

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

class Calendar extends Component {
  state = {
    events,
    // newEvent,
    // events: newEvents,
    // events: allEvents
    // visibleModal: true,
  };

  onCreate = text => {
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

    const updatedTasks = this.state.events.concat(newText);

    console.log(updatedTasks);
    this.setState(newText);
  }
  handleThisClick() {
    // console.log('handleThisClick');
    const newEvent = [{
      id: 8,
      title: ' text.title',
      description: 'text.description',
      dateFrom: new Date(2024, 10, 2, 10, 30),
      dateTo: new Date(2024, 10, 2, 11, 30),
    },];

    this.setState({ events: newEvent });
  }

  render() {
    const { weekDates } = this.props;

    return (
      <section className="calendar">
        <button onClick={this.handleThisClick}>!!!!!</button>
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            {this.props.modalVisible && <Modal handleClose={this.props.handleClose}
              onCreate={this.onCreate} />}
            {/* <Modal handleClose={this.props.handleClose} handleInfo={this.props.handleInfo} /> */}
            <Sidebar />
            <Week weekDates={weekDates} events={this.state.events} />
            {/* <button onClick={handleThisClick}>Chane</button> */}

          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
