import React, { useState } from 'react';
import moment from 'moment';
import './modal.scss';

function Modal({ handleClose, onCreate }) {

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endTime: moment().add(1, 'hour').format('HH:mm'),
  });

  const onChange = e => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    console.log(formState);
  };

  const handleEvents = () => {
    onCreate(formState);
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={handleClose}>+</button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={formState.title}
              onChange={onChange}
              required
            />
            <div className="event-form__time">
              <input type="date"
                name="date"
                className="event-form__field"
                // value='2018-07-22' 
                value={formState.date}
                onChange={onChange}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={formState.startTime}
                onChange={onChange}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={formState.endTime}
                onChange={onChange}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={formState.description}
              onChange={onChange}
              required
            ></textarea>
            <button type="submit" className="event-form__submit-btn" onClick={handleEvents}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Modal;
