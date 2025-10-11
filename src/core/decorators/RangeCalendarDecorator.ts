import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class RangeCalendarDecorator extends BaseCalendarDecorator {
  private startDate: Date | null = null;
  private endDate: Date | null = null;

  public setRange(start: Date, end: Date): void {
    this.startDate = start;
    this.endDate = end;
  }

  public isInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false;
    return date >= this.startDate && date <= this.endDate;
  }

  public getRange(): { start: Date | null; end: Date | null } {
    return { start: this.startDate, end: this.endDate };
  }

  public clearRange(): void {
    this.startDate = null;
    this.endDate = null;
  }
}
