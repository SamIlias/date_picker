import { CalendarConfig, ICalendar, WeekStartsOn } from './types';
import * as u from './utils';

const defaultCalendarConfig: CalendarConfig = {
  view: 'months',
  weekStartsOn: 'monday',
  initialDate: new Date(),
  minDate: null,
  maxDate: null,
  showWeekends: true,
  holidays: [],
  features: ['withRange'],
};

export class BaseCalendar implements ICalendar {
  config: CalendarConfig;

  constructor(config: CalendarConfig = defaultCalendarConfig) {
    this.config = config;
  }

  public isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  public isSameDay(date1: Date, date2?: Date | null): boolean {
    if (!date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  public isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  public isHoliday(date: Date, holidays: Date[]): boolean {
    return holidays.some((holiday) => this.isSameDay(date, holiday));
  }

  public isOtherMonth(date: Date, currentDate: Date): boolean {
    return date.getMonth() !== currentDate.getMonth();
  }

  public nextMonthDay(date: Date): Date {
    const next = new Date(date);
    next.setMonth(date.getMonth() + 1);
    return next;
  }

  public prevMonthDay(date: Date): Date {
    const next = new Date(date);
    next.setMonth(date.getMonth() - 1);
    return next;
  }

  public getDaysForMonthGrid(currentDate: Date, weekStartsOn: WeekStartsOn): Date[][] {
    return u.getDaysForMonthGrid(currentDate, weekStartsOn);
  }

  public getYearsForGrid(currentYear: number, count: number): number[] {
    return u.getYearsForGrid(currentYear, count);
  }
}
