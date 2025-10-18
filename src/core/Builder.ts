import { FeatureType } from '@/core/constants';

import { BaseCalendar } from './BaseCalendar';
import { DateLimitsCalendarDecorator } from './decorators/DateLimitsCalendarDecorator';
import { RangeCalendarDecorator } from './decorators/RangeCalendarDecorator';
import { TasksCalendarDecorator } from './decorators/TasksCalendarDecorator';
import { CalendarConfig, ICalendar } from './types';

interface ICalendarWithDecorator extends ICalendar {
  calendar?: ICalendar;
}

function hasInnerCalendar(obj: ICalendar): obj is ICalendarWithDecorator {
  return 'calendar' in obj;
}

function hasCalendarProp(obj: object, prop: PropertyKey): prop is keyof ICalendar {
  return typeof prop === 'string' && prop in obj;
}

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
        let current = hasInnerCalendar(target) ? target.calendar : undefined;
        while (current) {
          if (hasCalendarProp(current, prop)) {
            const value = current[prop];
            return typeof value === 'function' ? value.bind(current) : value;
          }
          current = hasInnerCalendar(current) ? current.calendar : undefined;
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
