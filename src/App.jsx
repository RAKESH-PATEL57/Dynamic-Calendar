import { useState } from 'react';
import CalendarGrid from './Components/CalendarGrid';
import EventModal from './Components/EventModal';
import EventListPanel from './Components/EventListPanel';
import { loadEventsFromStorage, saveEventsToStorage } from './utils/eventUtils';
import './style.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(loadEventsFromStorage());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle date click to open modal
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Handle event submission
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

  // Delete event for a specific date
  const handleEventDelete = (dateKey, eventIndex) => {
    const updatedEvents = { ...events };
    updatedEvents[dateKey].splice(eventIndex, 1);
    if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
  };

  // Navigate months
  const handleMonthChange = (offset) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset, 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="app">
      <h1>Dynamic Event Calendar</h1>

      {/* Month Navigation */}
      <div className="calendar-controls">
        <button onClick={() => handleMonthChange(-1)}>Previous</button>
        <span>
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={() => handleMonthChange(1)}>Next</button>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid
        selectedDate={selectedDate}
        events={events}
        onDateClick={handleDateClick}
      />

      {/* Event Modal */}
      {isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEventSubmit}
          selectedDate={selectedDate}
        />
      )}

      {/* Event List Panel */}
      <EventListPanel
        events={events[selectedDate.toISOString().split('T')[0]] || []}
        onDelete={(index) => handleEventDelete(selectedDate.toISOString().split('T')[0], index)}
      />
    </div>
  );
}

export default App;
