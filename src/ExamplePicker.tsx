import {
  Builder,
  CalendarConfig,
  DatePicker,
  FeatureType,
  holidaysBelarus,
  Views,
  WeekStartsOn,
} from '@';

const config: CalendarConfig = {
  view: Views.WEEKS,
  weekStartsOn: WeekStartsOn.MONDAY,
  initialDate: new Date(),
  minDate: new Date(2024, 3, 10),
  maxDate: new Date(2025, 11, 9),
  showWeekends: true,
  holidays: holidaysBelarus,
  features: [FeatureType.WITH_DATE_LIMITS, FeatureType.WITH_RANGE, FeatureType.WITH_TASKS],
};

const builder = new Builder(config);
const calendar = builder.createCalendar();

const customDate = new Date(2025, 11, 3);
const customCallback = (date: Date) => {
  console.log('Here the date for your application: ', date);
};

export const Example = () => {
  return <DatePicker calendar={calendar} customDate={customDate} customCallback={customCallback} />;
};
