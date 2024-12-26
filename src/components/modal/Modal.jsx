import React, { useState } from 'react';
import moment from 'moment';
import { getEvents, createEvent } from '../../common/gateway/index.js';
import './modal.scss';

const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

function Modal({ handleClose, events, setEvents }) {

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
  };

  const handleEvents = (e) => {
    e.preventDefault();

    const newTask = {
      title: formState.title,
      description: formState.description,
      dateFrom: moment(`${formState.date} ${formState.startTime}`).toDate(),
      dateTo: moment(`${formState.date} ${formState.endTime}`).toDate(),
    }

    const validateCreatedEvent = (eventData, events) => {
      const { dateFrom, dateTo } = eventData;
      if (dateFrom > dateTo) {
        return {
          isValid: false,
          validationMessage: 'Начало должно начинаться ранше конца мероприятия!!!'
        }
      }
      const duration = moment.duration(moment(dateTo).diff(dateFrom))
      if (duration.asHours() < 1) {
        return {
          isValid: false,
          validationMessage: 'Подія має тривати не менше години!!!'
        }
      }

      const isOverLapping = events.some(event => {
        return (
          Date.parse(event.dateFrom) < dateFrom
          && Date.parse(event.dateTo) > dateFrom
          || Date.parse(event.dateFrom) < dateTo
          && Date.parse(event.dateTo) > dateTo
        )
      })
      if (isOverLapping) {
        return {
          isValid: false,
          validationMessage: 'Події не повинні перетинатися'
        }
      }
      return { isValid: true, validationMessage: '' }
    }

    const { isValid, validationMessage } = validateCreatedEvent(newTask, events);

    if (!isValid) {
      alert(validationMessage);
      return;
    }


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
