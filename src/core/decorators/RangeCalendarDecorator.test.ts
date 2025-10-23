import { hasRangeFeature, RangeCalendarDecorator } from '@/core/decorators/RangeCalendarDecorator';
import { ICalendar } from '@/core/types';

describe('RangeCalendarDecorator', () => {
  let baseCalendar: ICalendar;
  let decorator: RangeCalendarDecorator;

  beforeEach(() => {
    baseCalendar = {
      config: {},
    } as unknown as ICalendar;

    decorator = new RangeCalendarDecorator(baseCalendar);
  });

  describe('isInRange', () => {
    it('should return true if date is within the range', () => {
      const start = new Date(2025, 5, 5);
      const end = new Date(2025, 5, 15);
      const date = new Date(2025, 5, 10);

      expect(decorator.isInRange(date, start, end)).toBe(true);
    });

    it('should return false if date is before the range', () => {
      const start = new Date(2025, 5, 5);
      const end = new Date(2025, 5, 15);
      const date = new Date(2025, 5, 3);

      expect(decorator.isInRange(date, start, end)).toBe(false);
    });

    it('should return false if date is after the range', () => {
      const start = new Date(2025, 5, 5);
      const end = new Date(2025, 5, 15);
      const date = new Date(2025, 5, 20);

      expect(decorator.isInRange(date, start, end)).toBe(false);
    });

    it('should work correctly if start is after end', () => {
      const start = new Date(2025, 5, 15);
      const end = new Date(2025, 5, 5);
      const dateInRange = new Date(2025, 5, 10);
      const dateOutOfRange = new Date(2025, 5, 3);

      expect(decorator.isInRange(dateInRange, start, end)).toBe(true);
      expect(decorator.isInRange(dateOutOfRange, start, end)).toBe(false);
    });

    it('should return true if date equals start or end', () => {
      const start = new Date(2025, 5, 5);
      const end = new Date(2025, 5, 15);

      expect(decorator.isInRange(start, start, end)).toBe(true);
      expect(decorator.isInRange(end, start, end)).toBe(true);
    });
  });

  describe('hasRangeFeature', () => {
    it('should return true for RangeCalendarDecorator instance', () => {
      expect(hasRangeFeature(decorator)).toBe(true);
    });

    it('should return false for object without isInRange', () => {
      const fakeCalendar = { config: {} } as ICalendar;
      expect(hasRangeFeature(fakeCalendar)).toBe(false);
    });
  });
});
