import { BaseCalendar } from '@/core/BaseCalendar';

import { ICalendar, WeekStartsOn } from '../types';

export class BaseCalendarDecorator implements ICalendar {
  protected calendar: BaseCalendar;

  constructor(calendar: BaseCalendar) {
    this.calendar = calendar;
  }

  get config() {
    return this.calendar.config;
  }

  isToday(date: Date): boolean {
    return this.calendar.isToday(date);
  }

  isSameDay(date1: Date, date2?: Date): boolean {
    return this.calendar.isSameDay(date1, date2);
  }

  isWeekend(date: Date): boolean {
    return this.calendar.isWeekend(date);
  }

  isHoliday(date: Date, holidays: Date[]): boolean {
    return this.calendar.isHoliday(date, holidays);
  }

  isOtherMonth(date: Date, currentDate: Date): boolean {
    return this.calendar.isOtherMonth(date, currentDate);
  }

  nextMonthDay(date: Date): Date {
    return this.calendar.nextMonthDay(date);
  }

  prevMonthDay(date: Date): Date {
    return this.calendar.prevMonthDay(date);
  }

  getDaysForMonthGrid(date: Date, weekStartsOn: WeekStartsOn): Date[][] {
    return this.calendar.getDaysForMonthGrid(date, weekStartsOn);
  }

  getYearsForGrid(currentYear: number, count: number): number[] {
    return this.calendar.getYearsForGrid(currentYear, count);
  }
}
