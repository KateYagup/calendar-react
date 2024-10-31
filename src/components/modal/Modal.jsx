import React, { Component } from 'react';
import moment from 'moment';
import './modal.scss';

const createData = () => {
  const data = moment().format('YYYY-MM-DD');
  return data;
}

const createEndTime = () => {
  const dayStart = new Date();
  const timeStamp = dayStart.getTime();
  // const nextHour = timeStamp + 10000 * 360;
  const nextHour = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 1);
  const nextHourForm = new Date(nextHour);
  return moment(nextHourForm).format('HH:mm');
}

class Modal extends Component {
  state = {
    beginTime: moment(new Date()).format('HH:mm'),
    endTime: createEndTime(),
    currentDay: createData(),
    title: 'Hello',
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  // handleCurrentDay = (event) => {
  //   this.setState({
  //     currentDay: '2023-10-30'
  //   })
  // }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }

  render() {
    const { title, currentDay } = this.state;
    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={this.props.handleClose}>+</button>
            <form className="event-form">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                value={this.state.title}
                onChange={this.handleTitle}
              />
              <div className="event-form__time">
                <input type="date"
                  name="date"
                  className="event-form__field"
                  // value='2018-07-22' 
                  value={this.state.currentDay}
                  onChange={handleChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  value={this.state.beginTime}
                // onChange={this.handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  value={this.state.endTime}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
