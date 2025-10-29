import { Builder, CalendarConfig, DatePicker, holidaysBelarus, Views, WeekStartsOn } from '@';
import { ThemeColor } from '@/theme/theme';

const config: CalendarConfig = {
  view: Views.WEEKS,
  weekStartsOn: WeekStartsOn.MONDAY,
  initialDate: new Date(),
  minDate: new Date(2024, 3, 10),
  maxDate: new Date(2025, 11, 9),
  showWeekends: true,
  holidays: holidaysBelarus,
  features: [],
};

const builder = new Builder(config);
const calendar = builder.createCalendar();

type DatePickerProps = {
  theme: ThemeColor;
  showWeekendsCustom: boolean;
  showHolidaysCustom: boolean;
};

export const BaseDatePicker = ({
  theme,
  showHolidaysCustom,
  showWeekendsCustom,
}: DatePickerProps) => {
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
