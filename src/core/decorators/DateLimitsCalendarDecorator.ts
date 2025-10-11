import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class DateLimitsCalendarDecorator extends BaseCalendarDecorator {
  override setDate(date: Date): void {
    if (!this.isDateAllowed(date)) {
      return;
    }
    this.calendar.setDate(date);
  }

  override nextMonth(): void {
    const next = new Date(this.getDate());
    next.setMonth(next.getMonth() + 1);
    if (this.isDateAllowed(next)) this.calendar.setDate(next);
  }

  override prevMonth(): void {
    const prev = new Date(this.getDate());
    prev.setMonth(prev.getMonth() - 1);
    if (this.isDateAllowed(prev)) this.calendar.setDate(prev);
  }

  override goToDate(date: Date): void {
    if (!this.isDateAllowed(date)) {
      return;
    }
    this.calendar.goToDate(date);
  }
}
