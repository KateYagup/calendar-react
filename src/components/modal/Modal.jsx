import React, { useState } from 'react';
import moment from 'moment';
import { getEvents, createEvent } from '../../common/gateway/index.js';
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

  if (formState.startTime === '00:00') {
    alert("Calendar can't display event which started at 00:00");
    return;
  }
  const onChange = e => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleEvents = (e) => {
    e.preventDefault();

    const newTask = {
      title: formState.title,
      description: formState.description,
      dateFrom: new Date(Date.parse(formState.date + 'T' + formState.startTime)),
      dateTo: new Date(Date.parse(formState.date + 'T' + formState.endTime)),
    }

    // console.log(newTask.dateFrom.getTime());

    if (newTask.dateFrom.getTime() > newTask.dateTo.getTime()) {
      alert('Начало должно начинаться ранше конца мероприятия.')
      return;
    }

    if (newTask.dateTo.getTime() - newTask.dateFrom.getTime() <= 60 * 1000) {
      alert('Подія має тривати не менше години.');
      return;
    }

    events.map(event => {
      if (Date.parse(event.dateFrom) < newTask.dateFrom.getTime()
        && Date.parse(event.dateTo) > newTask.dateFrom.getTime()
        || Date.parse(event.dateFrom) < newTask.dateTo.getTime()
        && Date.parse(event.dateTo) > newTask.dateTo.getTime()) {
        alert('Події не повинні перетинатися');
        return;
      }
    })
    createEvent(newTask).then(() => getEvents().then(setEvents))

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
            >\
            </textarea>

            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={handleEvents}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Modal;
