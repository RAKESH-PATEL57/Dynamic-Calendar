export const saveEventsToStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };
  
  export const loadEventsFromStorage = () => {
    return JSON.parse(localStorage.getItem("events")) || {};
  };
  