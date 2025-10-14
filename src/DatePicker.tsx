import { FC, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { MonthsCalendar } from '@/components/Calendar/MonthsCalendar';
import { WeeksCalendar } from '@/components/Calendar/WeeksCalendar';
import { YearsCalendar } from '@/components/Calendar/YearsCalendar';
import { Settings } from '@/components/ControlPanel/Settings';
import { DarkModeProvider, useDarkMode } from '@/context/darkModeContext';
import { Builder } from '@/core/Builder';
import { monthNames } from '@/core/constants';
import { CalendarConfig, ICalendar, MonthNames } from '@/core/types';
import { darkTheme, lightTheme } from '@/theme/theme';

import { ControlPanel } from './components/ControlPanel';

const config: CalendarConfig = {
  view: 'weeks',
  weekStartsOn: 'monday',
  initialDate: new Date(),
  minDate: null,
  maxDate: null,
  showWeekends: true,
  holidays: [],
  features: ['withRange'],
};

const builder = new Builder(config);
const calendar = builder.createCalendar();

export const DatePicker: FC = () => {
  return (
    <DarkModeProvider>
      <MainComponent calendar={calendar} />
    </DarkModeProvider>
  );
};

const MainComponent: FC<{ calendar: ICalendar }> = ({ calendar }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];

  const { isDark } = useDarkMode();
  const [view, setView] = useState(calendar.config.view);
  const [showWeekends, setShowWeekends] = useState(calendar.config.showWeekends);
  const [weekStartsOn, setWeekStartsOn] = useState(calendar.config.weekStartsOn);
  const [showHolidays, setShowHolidays] = useState(!!calendar.config.holidays.length);
  // const [rangeStart, setRangeStart] = useState(null);
  // const [rangeEnd, setRangeEnd] = useState(null);
  const [pointedDate, setPointedDate] = useState(currentDate); //not today
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [pointedYear, setPointedYear] = useState(pointedDate.getFullYear());

  const onNextYearClick = () => {
    setPointedYear((prevYear) => prevYear + 1);
  };

  const onPrevYearClick = () => {
    setPointedYear((prevYear) => prevYear - 1);
  };

  const onNextMonthClick = () => {
    setPointedDate(calendar.nextMonthDay(pointedDate));
  };

  const onPrevMonthClick = () => {
    setPointedDate(calendar.prevMonthDay(pointedDate));
  };

  const onYearSelect = (year: number) => {
    setSelectedYear(year);
    setView('months');
  };

  const onMonthSelect = (month: MonthNames) => {
    const monthIndex = monthNames.indexOf(month);
    const newCurrentDate = new Date(selectedYear, monthIndex, currentDate.getDate());
    setPointedDate(newCurrentDate);
    setView('weeks');
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ControlPanel>
        <Settings
          view={view}
          onViewChange={setView}
          weekStartsOn={weekStartsOn}
          onWeekStartsOnChange={setWeekStartsOn}
          showWeekends={showWeekends}
          onShowWeekendsChange={setShowWeekends}
          showHolidays={showHolidays}
          onShowHolidaysChange={setShowHolidays}
        />
        {/*<RangeInput />*/}
        {/*<DateInput />*/}
      </ControlPanel>

      {view === 'years' && (
        <YearsCalendar
          calendar={calendar}
          pointedYear={pointedYear}
          currentYear={currentYear}
          onNext={onNextYearClick}
          onPrev={onPrevYearClick}
          onYearSelect={onYearSelect}
        />
      )}

      {view === 'months' && (
        <MonthsCalendar currentMonth={currentMonth} onMonthSelect={onMonthSelect} />
      )}

      {view === 'weeks' && (
        <WeeksCalendar
          calendar={calendar}
          pointedDate={pointedDate}
          selectedDate={selectedDate}
          showWeekends={showWeekends}
          weekStartsOn={weekStartsOn}
          holidays={calendar.config.holidays}
          onDateSelect={setSelectedDate}
          onNextMonth={onNextMonthClick}
          onPrevMonth={onPrevMonthClick}
          // rangeEnd={rangeEnd}
          // rangeStart={rangeStart}
        />
      )}
    </ThemeProvider>
  );
};
