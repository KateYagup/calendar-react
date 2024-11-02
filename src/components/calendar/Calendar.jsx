import React, { Component } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import events from '../../gateway/events';

import './calendar.scss';

// const newEvents = events.slice();

class Calendar extends Component {
  state = {
    // events: newEvents,
    events,
    // visibleModal: true,
  };

  onCreate = text => {
    console.log('text!!!');
    console.log(text);
    // const { tasks } = this.state;
    // const newText = {
    //   id: Math.random(),
    //   title: text.title,
    //   description: text.description,
    //   dateFrom: text.dateFrom,
    //   dateTo: text.dateTo,
    // }

    // const updatedTasks = tasks.concat(newText);
    // console.log(updatedTasks);
    // this.setState({
    //   newText
    // })
  }

  render() {
    const { weekDates } = this.props;

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            {this.props.modalVisible && <Modal handleClose={this.props.handleClose}
              onCreate={this.onCreate} />}
            {/* <Modal handleClose={this.props.handleClose} handleInfo={this.props.handleInfo} /> */}
            <Sidebar />
            <Week weekDates={weekDates} events={this.state.events} />
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
