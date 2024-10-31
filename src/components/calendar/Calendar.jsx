import React, { Component } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

class Calendar extends Component {
  state = {
    events,
    // visibleModal: true,
  };

  render() {
    const { weekDates } = this.props;
    // console.log('events');
    // console.log(events);
    // const visibleModal = true;

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            {/* {this.props.modalVisible && <Modal handleClose={this.props.handleClose} />} */}
            <Modal handleClose={this.props.handleClose} />
            <Sidebar />
            <Week weekDates={weekDates} events={this.state.events} />
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
