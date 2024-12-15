/* eslint-disable react/prop-types */
function EventListPanel({ events, onDelete })
{
    return (
        <div className="event-list">
          <h3>Events</h3>
          {events.length > 0 ? (
            <ul>
              {events.map((event, index) => (
                <li key={index} className="list">
                  <div>
                    <strong>{event.eventName}</strong>
                    <p>
                      {event.startTime} - {event.endTime}
                    </p>
                    <p>{event.description}</p>
                  </div>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this day.</p>
          )}
        </div>
      );
}

export default EventListPanel;