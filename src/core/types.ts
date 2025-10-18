import { FeatureType, monthNames, Views, WeekStartsOn } from '@/core/constants';

export type MonthNames = (typeof monthNames)[number];

export interface CalendarConfig {
  view: Views;
  weekStartsOn: WeekStartsOn;
  initialDate?: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  showWeekends: boolean;
  holidays: Date[];
  features?: FeatureType[];
}

export type Task = {
  id: string;
  value: string;
};

export interface ICalendar {
  config: CalendarConfig;

  isToday(date: Date): boolean;

  isSameDay(date1: Date, date2?: Date | null): boolean;

  isWeekend(date: Date): boolean;

  isHoliday(date: Date, holidays: Date[]): boolean;

  isOtherMonth(date: Date, currentDate: Date): boolean;

  nextMonthDay(date: Date): Date;

  prevMonthDay(date: Date): Date;

  getDaysForMonthGrid(currentDate: Date, weekStartsOn: WeekStartsOn): Date[][];

  getYearsForGrid(currentYear: number, count: number): number[];
}
