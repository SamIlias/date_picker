import { WeekStartsOn } from '../types';

export function getDaysForMonthGrid(currentDate: Date, weekStartsOn: WeekStartsOn): Date[][] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const getWeekDay = (date: Date): number => {
    const day = date.getDay();
    return weekStartsOn === 'monday' ? (day === 0 ? 7 : day) : day + 1;
  };

  const firstWeekDay = getWeekDay(firstDayOfMonth);
  const lastWeekDay = getWeekDay(lastDayOfMonth);

  const gridStart = new Date(firstDayOfMonth);
  gridStart.setDate(firstDayOfMonth.getDate() - (firstWeekDay - 1));

  const gridEnd = new Date(lastDayOfMonth);
  const daysToAdd = 7 - lastWeekDay;
  gridEnd.setDate(lastDayOfMonth.getDate() + daysToAdd);

  const weeks: Date[][] = [];
  let week: Date[] = [];
  const current = new Date(gridStart);

  while (current <= gridEnd) {
    week.push(new Date(current));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    current.setDate(current.getDate() + 1);
  }

  if (weeks.length < 5) {
    const last = weeks[weeks.length - 1][6];
    const extraWeek: Date[] = [];
    for (let i = 1; i <= 7; i++) {
      const next = new Date(last);
      next.setDate(last.getDate() + i);
      extraWeek.push(next);
    }
    weeks.push(extraWeek);
  }

  return weeks;
}

export function getDaysForWeekGrid(currentDate: Date, weekStartsOn: WeekStartsOn): Date[] {
  const day = currentDate.getDay();
  const diff = weekStartsOn === 'monday' ? (day === 0 ? -6 : 1 - day) : -day;

  const start = new Date(currentDate);
  start.setDate(currentDate.getDate() + diff);

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    week.push(date);
  }

  return week;
}

export function getYearsForGrid(currentYear: number, count: number): number[] {
  const half = Math.floor(count / 2);
  return Array.from({ length: count }, (_, i) => currentYear - half + i);
}
