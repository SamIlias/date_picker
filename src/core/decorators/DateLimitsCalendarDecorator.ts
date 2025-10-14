import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class DateLimitsCalendarDecorator extends BaseCalendarDecorator {
  private isDateAllowed(date: Date): boolean {
    if (this.calendar.config.minDate && date < this.calendar.config.minDate) return false;
    if (this.calendar.config.maxDate && date > this.calendar.config.maxDate) return false;
    return true;
  }

  override nextMonthDay(date: Date): Date {
    const next = new Date(date);
    next.setMonth(next.getMonth() + 1);

    if (this.isDateAllowed(next)) return next;

    return date;
  }

  override prevMonthDay(date: Date): Date {
    const prev = new Date(date);
    prev.setMonth(prev.getMonth() - 1);

    if (this.isDateAllowed(prev)) return prev;

    return date;
  }
}
