import { WeekStartsOn } from '@/core/constants';
import { getDaysForMonthGrid, getYearsForGrid } from '@/core/utils';

describe('Calendar utils', () => {
  describe('getDaysForMonthGrid', () => {
    it('should return a grid of dates for a month starting on Sunday (weekStartsOn Sunday)', () => {
      const date = new Date(2024, 8, 15);
      const weeks = getDaysForMonthGrid(date, WeekStartsOn.SUNDAY);

      expect(weeks.every((week) => week.length === 7)).toBe(true);
      expect(weeks[0][0].getDay()).toBe(0);

      const lastDay = weeks[weeks.length - 1][6];
      expect(lastDay.getDay()).toBe(6);
    });

    it('should return a grid of dates for a month starting on Monday (weekStartsOn Monday)', () => {
      const date = new Date(2024, 8, 15);
      const weeks = getDaysForMonthGrid(date, WeekStartsOn.MONDAY);
      expect(weeks[0][0].getDay() === 1 || weeks[0][0].getDay() === 1).toBe(true);

      expect(weeks.every((week) => week.length === 7)).toBe(true);

      expect(weeks.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('getYearsForGrid', () => {
    it('should return an array of years centered around currentYear', () => {
      const years = getYearsForGrid(2025, 5);
      expect(years).toEqual([2023, 2024, 2025, 2026, 2027]);
    });

    it('should return correct number of years', () => {
      const years = getYearsForGrid(2025, 7);
      expect(years.length).toBe(7);
    });

    it('should work with even count of years', () => {
      const years = getYearsForGrid(2025, 4);
      expect(years).toEqual([2023, 2024, 2025, 2026]);
    });
  });
});
