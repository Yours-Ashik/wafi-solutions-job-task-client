import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/schedule")
      .then(res => res.json())
      .then(data => {
        const formattedEvents = data.map(event => ({
          notes: event.notes,
          start: moment(`${event.startDate} ${event.startTime}`, "YYYY-MM-DD HH:mm").toDate(),
          end: moment(`${event.endDate} ${event.endTime}`, "YYYY-MM-DD HH:mm").toDate(),
          startedTime: event.startTime,
          endTime: event.endTime
        }));

        setEvents(formattedEvents);
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const eventRenderer = ({ event }) => (
    <div className="flex flex-col items-start p-1 w-full h-full">
      <strong className="text-[9px] lg:text-xl">{event.notes}</strong>
      <p className="lg:text-xs text-[9px] text-white">{event.startedTime} - {event.endTime}</p>
    </div>
  );

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">📅 Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh" }}
        components={{
          event: eventRenderer,
        }}
      />
    </div>
  );
};

export default Schedule;
