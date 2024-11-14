import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [formState, setFormState] = useState({
    title: 'title',
    description: 'description',
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endTime: moment().add(1, 'hour').format('HH:mm'),
  });

  const handleNextWeek = () => {
    setWeekStartDate(new Date(weekStartDate.getTime() + 7 * 1000 * 60 * 60 * 24));
  }

  const handlePreviuosWeek = () => {
    setWeekStartDate(new Date(weekStartDate.getTime() - 7 * 1000 * 60 * 60 * 24));
  }

  const handleCurrentWeek = () => {
    setWeekStartDate(new Date());
  }

  const makeModalVisible = () => {
    setModalVisible(true);
  }

  const makeModalInvisible = () => {
    setModalVisible(false);
  }

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  // Загрузка данных с сервера
  const fetchTasksList = () => {

    fetch(baseUrl).then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .then(taskList => {
        setEvents(taskList);
      });
  }

  const createData = () => {
    const newTask = {
      // id: 3,
      id: Math.random(),
      title: '',
      description: '',
      dateFrom: new Date(2024, 10, 8, 10, 30),
      dateTo: new Date(2024, 10, 8, 11, 30),
    }

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    }).then(response => {
      if (response.ok) {
        fetchTasksList();
      } else {
        throw new Error('Failed to create task');
      }
    })
  }
  // Конец загрузки данных с сервера

  // Создание нового ивента
  const onCreate = text => {
    text['id'] = Math.random();
    const dateTimeFrom = new Date(Date.parse(text.date + 'T' + text.startTime));
    const dateTimeTo = new Date(Date.parse(text.date + 'T' + text.endTime));
    text['dateFrom'] = dateTimeFrom;
    text['dateTo'] = dateTimeTo;
    // text['description'] = 'Description of text';
    // text['title'] = 'This is a title';
    const updatedTasks = events.concat([text]);
    setEvents(updatedTasks);
  }

  // Добавление данных из модального окна
  const handleEvents = (e) => {
    e.preventDefault();
    onCreate(formState);

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState),
    })
    // .then(response => {
    //   if (response.ok) {
    //     fetch(baseUrl).then(res => {
    //       if (res.ok) return res.json();
    //     }).then(taskList => console.log(taskList));
    //   } else {
    //     throw new Error('Failed to create task');
    //   }
    // })
    // handleClose();
    makeModalInvisible();
  }

  useEffect(() => {
    fetchTasksList();
  }, [events]);
  // }, [events]);

  return (
    <>
      <Header
        handleNextWeek={handleNextWeek}
        handlePreviuosWeek={handlePreviuosWeek}
        handleCurrentWeek={handleCurrentWeek}
        weekStartDate={weekStartDate}
        handleModal={makeModalVisible}
      />
      <Calendar
        events={events}
        weekDates={weekDates}
        modalVisible={modalVisible}
        handleClose={makeModalInvisible}
        handleEvents={handleEvents}
        onCreate={onCreate}
        formState={formState}
        setFormState={formState}
      />
    </>
  )
}
// }

// class App extends Component {
//   state = {
//     weekStartDate: new Date(),
//   };

//   handleNextWeek = () => {
//     this.setState({
//       weekStartDate: new Date(this.state.weekStartDate.getTime() + 7 * 1000 * 60 * 60 * 24),
//     })
//   }

//   handlePreviuosWeek = () => {
//     this.setState({
//       weekStartDate: new Date(this.state.weekStartDate.getTime() - 7 * 1000 * 60 * 60 * 24),
//     })
//   }

//   handleCurrentWeek = () => {
//     this.setState({
//       weekStartDate: new Date(),
//     })
//   }

//   makeModalVisible = () => {
//     this.setState({
//       modalVisible: true,
//     });
//   }

//   makeModalInvisible = () => {
//     this.setState({
//       modalVisible: false,
//     });
//   }

//   render() {
//     const { weekStartDate } = this.state;
//     const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

//     return (
//       <>
//         <Header
//           handleNextWeek={this.handleNextWeek}
//           handlePreviuosWeek={this.handlePreviuosWeek}
//           handleCurrentWeek={this.handleCurrentWeek}
//           weekStartDate={this.state.weekStartDate}
//           handleModal={this.makeModalVisible}
//         />
//         <Calendar
//           weekDates={weekDates}
//           modalVisible={this.state.modalVisible}
//           handleClose={this.makeModalInvisible}
//         />
//       </>
//     );
//   }
// }

export default App;
