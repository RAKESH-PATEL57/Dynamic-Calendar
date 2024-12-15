/* eslint-disable react/prop-types */
import { useState } from 'react';

function EventModal({ onClose, onSubmit, selectedDate })
{
    const [eventName, setEventName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = () => {
      onSubmit({ eventName, startTime, endTime, description });
      setEventName('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    };

    return (
        <div className="event-modal">
          <h2>Add Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      );
}


export default EventModal;