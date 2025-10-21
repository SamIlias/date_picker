import { ICalendar } from '@/core/types';

import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class DateLimitsCalendarDecorator extends BaseCalendarDecorator {
  public isDateAllowed(date: Date): boolean {
    if (this.calendar.config.minDate && date < this.calendar.config.minDate) return false;
    if (this.calendar.config.maxDate && date > this.calendar.config.maxDate) return false;
    return true;
  }

  override nextMonthDay(date: Date): Date {
    const next = this.calendar.nextMonthDay(date);
    if (this.isDateAllowed(next)) return next;

    const firstDayNextMonth = new Date(next.getFullYear(), next.getMonth(), 1);
    if (this.isDateAllowed(firstDayNextMonth)) return firstDayNextMonth;

    return date;
  }

  override prevMonthDay(date: Date): Date {
    const prev = this.calendar.prevMonthDay(date);
    if (this.isDateAllowed(prev)) return prev;

    const lastDayPrevMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 0);
    if (this.isDateAllowed(lastDayPrevMonth)) return lastDayPrevMonth;

    return date;
  }
}

export function hasDateLimitsFeature(calendar: ICalendar): calendar is DateLimitsCalendarDecorator {
  return 'isDateAllowed' in calendar && typeof calendar.isDateAllowed === 'function';
}
