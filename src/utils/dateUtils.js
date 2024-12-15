export const generateMonthGrid = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
  
    const grid = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({ day: i, isCurrentMonth: true });
    }
    while (grid.length % 7 !== 0) {
      grid.push({ day: grid.length - daysInMonth, isCurrentMonth: false });
    }
    return grid;
  };
  