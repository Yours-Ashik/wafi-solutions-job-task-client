import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://www.gov.uk/bank-holidays.json")
      .then(res => res.json())
      .then(data => {
        const holidays = data["england-and-wales"].events;

        const formattedEvents = holidays.map(event => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(new Date(event.date).getTime() + 60 * 60 * 1000),
          notes: event.notes || "No notes",
        }));

        setEvents(formattedEvents);
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);
  const eventRenderer = ({ event }) => (
    <div className="flex flex-col items-start p-1 w-full h-full">
      <strong className="text-[9px] lg:text-xl">{event.title}</strong>
      <p className="lg:text-xs text-[9px] text-white">{event.notes}</p>
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
