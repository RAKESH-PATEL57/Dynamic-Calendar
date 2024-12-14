/* eslint-disable react/prop-types */
import { generateMonthGrid } from '../utils/dateUtils';

function CalenderGrid({ selectedDate, events, onDateClick })
{
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const monthGrid = generateMonthGrid(year, month);
  
    return (
        <div className="calendar-grid">
          {monthGrid.map((day, index) => (
            <div
              key={index}
              className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${
                new Date().toDateString() === new Date(year, month, day.day).toDateString()
                  ? 'today'
                  : ''
              }`}
              onClick={() => onDateClick(new Date(year, month, day.day))}
            >
              {day.day}
              {events[day.dateKey]?.length > 0 && <span className="event-indicator">●</span>}
            </div>
          ))}
        </div>
      );
}


export default CalenderGrid;