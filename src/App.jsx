import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { getWeekStartDate, generateWeekRange } from './common/utils/dateUtils.js';
import './common/common.scss';

const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  const makeModalVisible = () => {
    setModalVisible(true);
  }

  const makeModalInvisible = () => {
    setModalVisible(false);
  }

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const fetchTasksList = () => {
    fetch(baseUrl).then(res => res.json())
      .then(taskList => {
        setEvents(taskList);
      });
  }

  // Конец загрузки данных с сервера

  useEffect(() => {
    fetchTasksList();
  }, []);

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        handleModal={makeModalVisible}
      />
      <Calendar
        events={events}
        setEvents={setEvents}
        weekDates={weekDates}
      />
      {modalVisible
        && <Modal
          handleClose={makeModalInvisible}
          events={events}
          setEvents={setEvents}

        />}
    </>
  )
}

export default App;
