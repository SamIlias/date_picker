import { CalendarConfig, ICalendar } from './types';
import * as u from './utils';

const defaultCalendarConfig: CalendarConfig = {
  view: 'month',
  weekStartsOn: 'monday',
  initialDate: new Date(),
  minDate: null,
  maxDate: null,
  showWeekends: true,
  holidays: [],
  features: ['withRange'],
};

export class BaseCalendar implements ICalendar {
  currentDate: Date;
  config: CalendarConfig;

  constructor(config: CalendarConfig = defaultCalendarConfig) {
    this.config = config;
    this.currentDate = config.initialDate || new Date();
  }

  public setDate(date: Date): void {
    this.currentDate = date;
  }

  public getDate(): Date {
    return this.currentDate;
  }

  public nextMonth(): void {
    const next = new Date(this.currentDate);
    next.setMonth(this.currentDate.getMonth() + 1);
    this.setDate(next);
  }

  public prevMonth(): void {
    const prev = new Date(this.currentDate);
    prev.setMonth(this.currentDate.getMonth() - 1);
    this.setDate(prev);
  }

  public goToDate(date: Date): void {
    this.setDate(date);
  }

  public getDaysForMonthGrid(currentDate: Date): Date[][] {
    const { weekStartsOn } = this.config;
    return u.getDaysForMonthGrid(currentDate, weekStartsOn);
  }

  public getDaysForWeekGrid(currentDate: Date): Date[] {
    const { weekStartsOn } = this.config;
    return u.getDaysForWeekGrid(currentDate, weekStartsOn);
  }
}
