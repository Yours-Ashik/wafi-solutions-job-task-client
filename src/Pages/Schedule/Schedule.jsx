import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const localizer = momentLocalizer(moment);

const fetchSchedule = async () => {
  const { data } = await axios.get("https://job-task-server-six-tau.vercel.app/schedule");
  return data;
};

const Schedule = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["schedule"],
    queryFn: fetchSchedule,
    refetchInterval: 1000,
  });

  // ✅ States for Filtering
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );


  const allEvents = data.map((event) => ({
    notes: event.notes,
    start: moment(`${event.startDate} ${event.startTime}`, "YYYY-MM-DD HH:mm").toDate(),
    end: moment(`${event.endDate} ${event.endTime}`, "YYYY-MM-DD HH:mm").toDate(),
    startedTime: event.startTime,
    endTime: event.endTime,
  }));

  
  const filteredEvents = allEvents.filter((event) => {
    if (!startDate || !endDate) return true;
    const filterStart = moment(startDate, "YYYY-MM-DD").startOf("day").toDate();
    const filterEnd = moment(endDate, "YYYY-MM-DD").endOf("day").toDate();
    return event.start >= filterStart && event.end <= filterEnd;
  });

  // ✅ Reset Filters
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
  };

  const eventRenderer = ({ event }) => (
    <div className="flex flex-col items-start p-1 w-full h-full">
      <strong className="text-[9px] lg:text-xl">{event.notes}</strong>
      <p className="lg:text-xs text-[9px] text-white">
        {event.startedTime} - {event.endTime}
      </p>
    </div>
  );

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl relative">
      {/* ✅ Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-700">📅 Calendar</h2>

        {/* ✅ Filter Section */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex flex-wrap items-center space-x-2 gap-2">
          <label className="text-sm font-medium text-gray-600">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-1 border rounded-md text-sm"
          />

          <label className="text-sm font-medium text-gray-600">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-1 border rounded-md text-sm"
          />

          <button
            className="bg-[#636AE8] text-white px-3 py-1 rounded-md hover:bg-blue-900 text-sm"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ✅ Calendar Section */}
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh" }}
        components={{ event: eventRenderer }}
      />
    </div>
  );
};

export default Schedule;
