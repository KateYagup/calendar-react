import React from 'react';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
// import { events } from '../../../src/gateway/events.js';

const Hour = ({ dataHour, hourEvents, handleDeleteEvent }) => {
  const deleteEvent = () => {
    console.log('e.target');
  }

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            handleDeleteEvent={handleDeleteEvent}
          // onDoubleClick={console.log('onDoubleClick')}
          // onClick={() => { console.log(id) }}
          // onClick={deleteEvent}

          />
        );
      })}
    </div>
  );
};

export default Hour;
