import { DateLimitsCalendarDecorator } from '@/core/decorators/DateLimitsCalendarDecorator';
import { ICalendar } from '@/core/types';

describe('DateLimitsCalendarDecorator', () => {
  let baseCalendar: jest.Mocked<ICalendar>;
  let decorator: DateLimitsCalendarDecorator;

  const mockNextMonthDay = jest.fn();
  const mockPrevMonthDay = jest.fn();

  beforeEach(() => {
    baseCalendar = {
      config: {},
      nextMonthDay: mockNextMonthDay,
      prevMonthDay: mockPrevMonthDay,
    } as unknown as jest.Mocked<ICalendar>;

    decorator = new DateLimitsCalendarDecorator(baseCalendar);
  });

  describe('isDateAllowed', () => {
    it('should return true when date is within limits', () => {
      baseCalendar.config.minDate = new Date(2025, 0, 1);
      baseCalendar.config.maxDate = new Date(2025, 11, 31);

      const date = new Date(2025, 5, 15);
      expect(decorator.isDateAllowed(date)).toBe(true);
    });

    it('should return false when date is before minDate', () => {
      baseCalendar.config.minDate = new Date(2025, 0, 1);
      const date = new Date(2024, 11, 31);
      expect(decorator.isDateAllowed(date)).toBe(false);
    });

    it('should return false when date is after maxDate', () => {
      baseCalendar.config.maxDate = new Date(2025, 11, 31);
      const date = new Date(2026, 0, 1);
      expect(decorator.isDateAllowed(date)).toBe(false);
    });

    it('should return true when no limits are defined', () => {
      const date = new Date(2025, 5, 5);
      expect(decorator.isDateAllowed(date)).toBe(true);
    });
  });

  describe('nextMonthDay', () => {
    it('should return next month date if allowed', () => {
      const currentDate = new Date(2025, 5, 15);
      const nextDate = new Date(2025, 6, 15);

      mockNextMonthDay.mockReturnValue(nextDate);
      jest.spyOn(decorator, 'isDateAllowed').mockReturnValue(true);

      expect(decorator.nextMonthDay(currentDate)).toEqual(nextDate);
    });

    it('should return first day of next month if next date is not allowed but first day is', () => {
      const currentDate = new Date(2025, 5, 15);
      const nextDate = new Date(2025, 6, 15);
      const firstDayNextMonth = new Date(2025, 6, 1);

      mockNextMonthDay.mockReturnValue(nextDate);
      jest
        .spyOn(decorator, 'isDateAllowed')
        .mockImplementation((d) => d.getTime() === firstDayNextMonth.getTime());

      expect(decorator.nextMonthDay(currentDate)).toEqual(firstDayNextMonth);
    });

    it('should return current date if both next date and first day are not allowed', () => {
      const currentDate = new Date(2025, 5, 15);
      mockNextMonthDay.mockReturnValue(new Date(2025, 6, 15));
      jest.spyOn(decorator, 'isDateAllowed').mockReturnValue(false);

      expect(decorator.nextMonthDay(currentDate)).toEqual(currentDate);
    });
  });

  describe('prevMonthDay', () => {
    it('should return previous month date if allowed', () => {
      const currentDate = new Date(2025, 5, 15);
      const prevDate = new Date(2025, 4, 15);

      mockPrevMonthDay.mockReturnValue(prevDate);
      jest.spyOn(decorator, 'isDateAllowed').mockReturnValue(true);

      expect(decorator.prevMonthDay(currentDate)).toEqual(prevDate);
    });

    it('should return last day of previous month if prev date is not allowed but last day is', () => {
      const currentDate = new Date(2025, 5, 15);
      const prevDate = new Date(2025, 4, 15);
      const lastDayPrevMonth = new Date(2025, 4, 31);

      mockPrevMonthDay.mockReturnValue(prevDate);
      jest
        .spyOn(decorator, 'isDateAllowed')
        .mockImplementation((d) => d.getTime() === lastDayPrevMonth.getTime());

      expect(decorator.prevMonthDay(currentDate)).toEqual(lastDayPrevMonth);
    });

    it('should return current date if both prev date and last day are not allowed', () => {
      const currentDate = new Date(2025, 5, 15);
      mockPrevMonthDay.mockReturnValue(new Date(2025, 4, 15));
      jest.spyOn(decorator, 'isDateAllowed').mockReturnValue(false);

      expect(decorator.prevMonthDay(currentDate)).toEqual(currentDate);
    });
  });
});
