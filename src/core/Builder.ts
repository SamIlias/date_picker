import { BaseCalendar } from './BaseCalendar';
import { DateLimitsCalendarDecorator } from './decorators/DateLimitsCalendarDecorator';
import { RangeCalendarDecorator } from './decorators/RangeCalendarDecorator';
import { TasksCalendarDecorator } from './decorators/TasksCalendarDecorator';
import { CalendarConfig, FeatureType, ICalendar } from './types';

interface ICalendarWithDecorator extends ICalendar {
  calendar?: ICalendar;
};

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

    this.calendar = this.createTransparentProxy(this.calendar);
  }

  private createTransparentProxy(calendar: ICalendar): ICalendar {
    return new Proxy(calendar, {
      get(target, prop, receiver) {
        if (prop in target) return Reflect.get(target, prop, receiver);
        let current = (target as ICalendarWithDecorator).calendar;
        while (current) {
          if (prop in current) {
            const value = current[prop as keyof ICalendar];
            return typeof value === 'function' ? value.bind(current) : value;
          }
          current = (current as ICalendarWithDecorator).calendar;
        }
        return undefined;
      },
    });
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
