import { BaseCalendar } from '@/core/BaseCalendar';
import { FeatureType, Views, WeekStartsOn } from '@/core/constants';

describe('BaseCalendar', () => {
  let calendar: BaseCalendar;
  const today = new Date();
  const holidays = [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)];

  beforeEach(() => {
    calendar = new BaseCalendar({
      view: Views.WEEKS,
      weekStartsOn: WeekStartsOn.MONDAY,
      initialDate: today,
      minDate: null,
      maxDate: null,
      showWeekends: true,
      holidays,
      features: [FeatureType.WITH_RANGE],
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      expect(calendar.isToday(today)).toBe(true);
    });

    it('should return false for other day', () => {
      const date = new Date(today);
      date.setDate(today.getDate() - 1);
      expect(calendar.isToday(date)).toBe(false);
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const date = new Date(today);
      expect(calendar.isSameDay(today, date)).toBe(true);
    });

    it('should return false for different day', () => {
      const date = new Date(today);
      date.setDate(today.getDate() - 1);
      expect(calendar.isSameDay(today, date)).toBe(false);
    });

    it('should return false if second date is null', () => {
      expect(calendar.isSameDay(today, null)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    it('should return true for Saturday and Sunday', () => {
      const saturday = new Date(2024, 9, 5);
      const sunday = new Date(2024, 9, 6);
      expect(calendar.isWeekend(saturday)).toBe(true);
      expect(calendar.isWeekend(sunday)).toBe(true);
    });

    it('should return false for weekday', () => {
      const monday = new Date(2024, 9, 7);
      expect(calendar.isWeekend(monday)).toBe(false);
    });
  });

  describe('isHoliday', () => {
    it('should return true if date is in holidays', () => {
      const holiday = holidays[0];
      expect(calendar.isHoliday(holiday, holidays)).toBe(true);
    });

    it('should return false if date is not a holiday', () => {
      const notHoliday = new Date(today);
      notHoliday.setDate(today.getDate() + 2);
      expect(calendar.isHoliday(notHoliday, holidays)).toBe(false);
    });
  });

  describe('isOtherMonth', () => {
    it('should return true if date is from another month', () => {
      const nextMonthDay = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
      expect(calendar.isOtherMonth(nextMonthDay, today)).toBe(true);
    });

    it('should return false if date is from the same month', () => {
      const sameMonthDay = new Date(today);
      expect(calendar.isOtherMonth(sameMonthDay, today)).toBe(false);
    });
  });

  describe('nextMonthDay', () => {
    it('should return correct next month day', () => {
      const date = new Date(2024, 0, 31);
      const next = calendar.nextMonthDay(date);
      expect(next.getMonth()).toBe(1);
      expect(next.getDate()).toBe(29);
    });
  });

  describe('prevMonthDay', () => {
    it('should return correct previous month day', () => {
      const date = new Date(2024, 2, 31);
      const prev = calendar.prevMonthDay(date);
      expect(prev.getMonth()).toBe(1);
      expect(prev.getDate()).toBe(29);
    });
  });

  describe('getDaysForMonthGrid', () => {
    it('should return an array of weeks with 7 days each', () => {
      const weeks = calendar.getDaysForMonthGrid(today, WeekStartsOn.MONDAY);
      expect(Array.isArray(weeks)).toBe(true);
      expect(weeks.every((week) => week.length === 7)).toBe(true);
    });
  });

  describe('getYearsForGrid', () => {
    it('should return an array of consecutive years centered around current year', () => {
      const currentYear = 2025;
      const count = 5;
      const years = calendar.getYearsForGrid(currentYear, count);
      expect(years).toEqual([2023, 2024, 2025, 2026, 2027]);
    });
  });
});
