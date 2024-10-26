import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

class App extends Component {
  state = {
    weekStartDate: new Date(),
  };

  handleNextWeek = () => {
    this.setState({
      weekStartDate: new Date(this.state.weekStartDate.getTime() + 7 * 1000 * 60 * 60 * 24),
    })
  }

  handlePreviuosWeek = () => {
    this.setState({
      weekStartDate: new Date(this.state.weekStartDate.getTime() - 7 * 1000 * 60 * 60 * 24),
    })
  }

  handleCurrentWeek = () => {
    this.setState({
      weekStartDate: new Date(),

    })
  }



  render() {
    const { weekStartDate } = this.state;
    // const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    // console.log('weekStartDate');
    // console.log(weekStartDate);
    // const nextDate = weekStartDate.getTime() + 7 * 1000 * 60 * 60 * 24;
    // console.log(new Date(nextDate));
    // const nextNumberDay = new Date(nextDate)
    // console.log(nextNumberDay.getDate());
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          handleNextWeek={this.handleNextWeek}
          handlePreviuosWeek={this.handlePreviuosWeek}
          handleCurrentWeek={this.handleCurrentWeek}
          weekStartDate={this.state.weekStartDate}
        />
        <Calendar weekDates={weekDates} />
      </>
    );
  }
}

export default App;
