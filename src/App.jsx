import CalendarGrid from './Components/CalendarGrid';
import EventModal from './Components/EventModal';
import EventListPanel from './Components/EventListPanel';
import { loadEventsFromStorage, saveEventsToStorage } from './utils/eventUtils';
import './style.css'

import { useState } from 'react';
function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(loadEventsFromStorage());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEventSubmit = (event) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const updatedEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), event],
    };
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
    setIsModalOpen(false);
  };

  const handleEventDelete = (dateKey, eventIndex) => {
    const updatedEvents = { ...events };
    updatedEvents[dateKey].splice(eventIndex, 1);
    if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
  };

  return (
    <div className="app">
      <h1>Dynamic Event Calendar</h1>
      <CalendarGrid
        selectedDate={selectedDate}
        events={events}
        onDateClick={handleDateClick}
      />
      {isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEventSubmit}
          selectedDate={selectedDate}
          event={selectedEvent}
        />
      )}
      <EventListPanel
        events={events[selectedDate.toISOString().split('T')[0]] || []}
        onDelete={(index) => handleEventDelete(selectedDate.toISOString().split('T')[0], index)}
      />
    </div>
  );
};

export default App
