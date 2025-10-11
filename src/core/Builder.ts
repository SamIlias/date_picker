import { BaseCalendar } from './BaseCalendar';
import { DateLimitsCalendarDecorator } from './decorators/DateLimitsCalendarDecorator';
import { RangeCalendarDecorator } from './decorators/RangeCalendarDecorator';
import { TasksCalendarDecorator } from './decorators/TasksCalendarDecorator';
import { CalendarConfig, FeatureType, ICalendar } from './types';

type CalendarDecoratorClass = new (calendar: ICalendar) => ICalendar;

const decoratorsMap: Record<FeatureType, CalendarDecoratorClass> = {
  withRange: RangeCalendarDecorator,
  withTasks: TasksCalendarDecorator,
  withDateLimits: DateLimitsCalendarDecorator,
};

export class Builder {
  private calendar: ICalendar;

  constructor(config: CalendarConfig) {
    this.calendar = new BaseCalendar(config);

    if (config.features?.length) {
      for (const feature of config.features) {
        this.addFeature(feature);
      }
    }
  }

  public addFeature(feature: FeatureType): void {
    const DecoratorClass = decoratorsMap[feature];
    if (!DecoratorClass) return;

    this.calendar = new DecoratorClass(this.calendar);
  }

  public createCalendar(): ICalendar {
    return this.calendar;
  }
}
