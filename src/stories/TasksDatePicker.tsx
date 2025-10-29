import {
  Builder,
  CalendarConfig,
  DatePicker,
  FeatureType,
  holidaysBelarus,
  Views,
  WeekStartsOn,
} from '@';
import { ThemeColor } from '@/theme/theme';

const config: CalendarConfig = {
  view: Views.WEEKS,
  weekStartsOn: WeekStartsOn.MONDAY,
  initialDate: new Date(),
  minDate: new Date(2024, 3, 10),
  maxDate: new Date(2025, 11, 9),
  showWeekends: true,
  holidays: holidaysBelarus,
  features: [FeatureType.WITH_TASKS],
};

const builder = new Builder(config);
const calendar = builder.createCalendar();

type FullDatePickerProps = {
  theme: ThemeColor;
  showWeekendsCustom: boolean;
  showHolidaysCustom: boolean;
};

export const TasksDatePicker = ({
  theme,
  showWeekendsCustom,
  showHolidaysCustom,
}: FullDatePickerProps) => {
  const customDate = new Date(2025, 10, 3);

  const customCallback = (date: Date) => {
    console.log('Here the date for your app: ', date);
  };

  return (
    <DatePicker
      calendar={calendar}
      customDate={customDate}
      customCallback={customCallback}
      theme={theme}
      showWeekendsCustom={showWeekendsCustom}
      showHolidaysCustom={showHolidaysCustom}
    />
  );
};
