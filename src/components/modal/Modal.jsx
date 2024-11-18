import React, { useState } from 'react';
import moment from 'moment';
import './modal.scss';

const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

function Modal({ handleClose, events, setEvents }) {

  const [formState, setFormState] = useState({
    title: 'title',
    description: 'description',
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endTime: moment().add(1, 'hour').format('HH:mm'),
  });

  const onChange = e => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    // console.log(formState);
  };

  const handleEvents = (e) => {
    e.preventDefault();

    const newTask = {
      title: formState.title,
      description: formState.description,
      dateFrom: new Date(Date.parse(formState.date + 'T' + formState.startTime)),
      dateTo: new Date(Date.parse(formState.date + 'T' + formState.endTime)),
    }

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    })
      .then(response => {
        if (response.ok) {
          fetch(baseUrl).then(res => {
            if (res.ok) return res.json();
          }).then(taskList => {
            setEvents(taskList);
          }
          );
        } else {
          throw new Error('Failed to create task');
        }
      })
    handleClose();

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
              onChange={e => onChange(e)}
              required
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={handleEvents}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Modal;
