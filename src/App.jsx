import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateServer, setStateServer] = useState([]);

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
        setStateServer(taskList);
        console.log(taskList);
      });
  }

  const createData = () => {
    console.log('stateServer');
    console.log(stateServer);
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
        // fetch(baseUrl).then(res => {
        //   if (res.ok) {
        //     return res.json();
        //   }
        // })
        //   .then(taskList => {
        //     console.log(taskList);
        //     setStateServer(taskList);
        //   });

        fetchTasksList();
      } else {
        throw new Error('Failed to create task');
      }
    })
    console.log('stateServer');
    console.log(stateServer);
  }
  // Конец загрузки данных с сервера

  useEffect(() => {
    // const fetchTasksList = () => {
    //   fetch(baseUrl).then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //   })
    //     .then(taskList => {
    //       setStateServer(taskList);
    //     });
    // }

    createData();
  }, []);

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
        weekDates={weekDates}
        modalVisible={modalVisible}
        handleClose={makeModalInvisible}
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
