import { ICalendar } from '../types';
import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class RangeCalendarDecorator extends BaseCalendarDecorator {
  public isInRange(date: Date, start: Date, end: Date): boolean {
    return start <= date && start <= end;
  }
}

export interface IRangeCalendar extends ICalendar {
  isInRange(date: Date, start: Date, end: Date): boolean;
}
