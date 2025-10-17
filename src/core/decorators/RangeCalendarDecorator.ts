import { ICalendar } from '../types';
import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class RangeCalendarDecorator extends BaseCalendarDecorator {
  public isInRange(date: Date, start: Date, end: Date): boolean {
    const [from, to] = start <= end ? [start, end] : [end, start];
    return from <= date && date <= to;
  }
}

export function hasRangeFeature(calendar: ICalendar): calendar is RangeCalendarDecorator {
  return typeof (calendar as RangeCalendarDecorator).isInRange === 'function';
}
