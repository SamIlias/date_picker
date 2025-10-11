import { BaseCalendar } from 'core/BaseCalendar';

import { ICalendar } from '../types';

export class BaseCalendarDecorator implements ICalendar {
  protected calendar: BaseCalendar;

  constructor(calendar: BaseCalendar) {
    this.calendar = calendar;
  }

  get config() {
    return this.calendar.config;
  }

  get currentDate() {
    return this.calendar.currentDate;
  }

  setDate(date: Date): void {
    this.calendar.setDate(date);
  }

  getDate(): Date {
    return this.calendar.getDate();
  }

  nextMonth(): void {
    this.calendar.nextMonth();
  }

  prevMonth(): void {
    this.calendar.prevMonth();
  }

  goToDate(date: Date): void {
    this.calendar.goToDate(date);
  }

  getDaysForMonthGrid(date: Date): Date[][] {
    return this.calendar.getDaysForMonthGrid(date);
  }

  getDaysForWeekGrid(date: Date): Date[] {
    return this.calendar.getDaysForWeekGrid(date);
  }
}
