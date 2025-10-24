import { Builder } from '@/core/Builder';
import { FeatureType, Views, WeekStartsOn } from '@/core/constants';
import { DateLimitsCalendarDecorator } from '@/core/decorators/DateLimitsCalendarDecorator';
import { RangeCalendarDecorator } from '@/core/decorators/RangeCalendarDecorator';
import { TasksCalendarDecorator } from '@/core/decorators/TasksCalendarDecorator';

describe('Builder', () => {
  const baseConfig = {
    view: Views.WEEKS,
    weekStartsOn: WeekStartsOn.SUNDAY,
    showWeekends: true,
    holidays: [],
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        store: {} as Record<string, string>,
        getItem(key: string) {
          return this.store[key] || null;
        },
        setItem(key: string, value: string) {
          this.store[key] = value;
        },
        clear() {
          this.store = {};
        },
      },
      writable: true,
    });
  });

  it('should create a base calendar without features', () => {
    const builder = new Builder({ ...baseConfig, features: [] });
    const calendar = builder.createCalendar();

    expect(calendar).toBeDefined();
    expect(calendar).toHaveProperty('nextMonthDay');
    expect(calendar).toHaveProperty('prevMonthDay');
  });

  it('should add a single feature decorator', () => {
    const builder = new Builder({ ...baseConfig, features: [FeatureType.WITH_DATE_LIMITS] });
    const calendar = builder.createCalendar();

    expect(calendar).toBeInstanceOf(DateLimitsCalendarDecorator);
    expect(calendar).toHaveProperty('isDateAllowed');
  });

  it('should add multiple feature decorators', () => {
    const builder = new Builder({
      ...baseConfig,
      features: [FeatureType.WITH_TASKS, FeatureType.WITH_RANGE],
    });
    const calendar = builder.createCalendar();

    expect(calendar).toHaveProperty('addTask');
    expect(calendar).toHaveProperty('getTasks');
    expect(calendar).toHaveProperty('isInRange');
  });

  it('should ignore unknown features', () => {
    const builder = new Builder({
      ...baseConfig,
      features: ['unknownFeature' as FeatureType],
    });
    const calendar = builder.createCalendar();

    expect(calendar).toBeDefined();
    expect(calendar).not.toHaveProperty('addTask');
    expect(calendar).not.toHaveProperty('isInRange');
    expect(calendar).not.toHaveProperty('isDateAllowed');
  });

  describe('transparent proxy', () => {
    it('should access top-level methods', () => {
      const builder = new Builder({ ...baseConfig, features: [] });
      const calendar = builder.createCalendar();

      expect('nextMonthDay' in calendar).toBe(true);
      expect('prevMonthDay' in calendar).toBe(true);
    });

    it('should access methods from inner decorators', () => {
      const builder = new Builder({ ...baseConfig, features: [FeatureType.WITH_TASKS] });
      const calendar = builder.createCalendar();

      expect('addTask' in calendar).toBe(true);
      expect('getTasks' in calendar).toBe(true);
    });

    it('should bind methods to correct "this"', () => {
      const builder = new Builder({ ...baseConfig, features: [FeatureType.WITH_TASKS] });
      const calendar = builder.createCalendar();

      const date = new Date(2024, 5, 10);
      (calendar as TasksCalendarDecorator).addTask(date, 'Test', () => {});
      expect((calendar as TasksCalendarDecorator).getTasks(date)[0].value).toBe('Test');
    });
  });

  it('should allow calling multiple decorator methods through proxy', () => {
    const builder = new Builder({
      ...baseConfig,
      features: [FeatureType.WITH_TASKS, FeatureType.WITH_RANGE, FeatureType.WITH_DATE_LIMITS],
    });
    const calendar = builder.createCalendar();

    const date = new Date(2024, 5, 10);
    (calendar as TasksCalendarDecorator).addTask(date, 'Task 1', () => {});
    expect((calendar as TasksCalendarDecorator).getTasks(date)[0].value).toBe('Task 1');

    const start = new Date(2024, 5, 5);
    const end = new Date(2024, 5, 15);
    expect((calendar as RangeCalendarDecorator).isInRange(date, start, end)).toBe(true);

    (calendar as DateLimitsCalendarDecorator).isDateAllowed(date);
    expect(typeof (calendar as DateLimitsCalendarDecorator).isDateAllowed).toBe('function');
  });
});
