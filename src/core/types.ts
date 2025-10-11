export type WeekStarts = 'monday' | 'sunday';

export interface CalendarConfig {
  view?: 'week' | 'month' | 'year';
  weekStartsOn: WeekStarts;
  initialDate?: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  showWeekends?: boolean;
  holidays?: Date[];
  features?: FeatureType[];
}

export type FeatureType = 'withTasks' | 'withRange' | 'withDateLimits';

export interface ICalendar {
  config: CalendarConfig;
  currentDate: Date;

  setDate(date: Date): void;

  getDate(): Date;

  nextMonth(): void;

  prevMonth(): void;

  goToDate(date: Date): void;

  getDaysForMonthGrid(currentDate: Date): Date[][];

  getDaysForWeekGrid(currentDate: Date): Date[];
}
