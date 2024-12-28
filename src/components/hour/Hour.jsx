import React from 'react';
import Event from '../event/Event';
import { formatMins } from '../../common/utils/dateUtils.js';
import moment from 'moment';

const Hour = ({ dataHour, hourEvents, events, setEvents }) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${moment(dateFrom).format('H:mm')}`;
        const eventEnd = `${moment(dateTo).format('H:mm')}`;

        return (
          <Event
            key={id}
            id={id}
            dateFrom={dateFrom}
            events={events}
            setEvents={setEvents}
            height={(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60)}
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            hourEvents={hourEvents}
          />
        );
      })}
    </div>
  );
};

export default Hour;
