import React, { Component } from 'react';
import moment from 'moment';
import './modal.scss';

class Modal extends Component {
  state = {
    currentDate: new Date(),
    currentDay: moment(),
    // currentData: currentDate.getDate(),
  }

  render() {

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
                value="!!!!"
              />
              <div className="event-form__time">
                <input type="date"
                  name="date"
                  className="event-form__field"
                  value='!!!' />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  onChange={this.handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
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
