import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { MonthsCalendar } from '@/components/Calendar/MonthsCalendar';
import { WeeksCalendar } from '@/components/Calendar/WeeksCalendar';
import { YearsCalendar } from '@/components/Calendar/YearsCalendar';
import { DateInput } from '@/components/ControlPanel/DateInput';
import { RangeInput } from '@/components/ControlPanel/RangeInput';
import { Settings } from '@/components/ControlPanel/Settings';
import { TasksModal } from '@/components/TasksModal';
import { DarkModeProvider, useDarkMode } from '@/context/darkModeContext';
import { Builder } from '@/core/Builder';
import { formatDateForInput, holidaysBel } from '@/core/constants';
import { hasTasksFeature } from '@/core/decorators/TasksCalendarDecorator';
import { CalendarConfig, ICalendar } from '@/core/types';
import { darkTheme, lightTheme } from '@/theme/theme';
import { useDataPicker } from '@/useDataPicker';

import { ControlPanel } from './components/ControlPanel';

const config: CalendarConfig = {
  view: 'weeks',
  weekStartsOn: 'monday',
  initialDate: new Date(),
  minDate: null,
  maxDate: null,
  showWeekends: true,
  holidays: holidaysBel,
  features: ['withRange', 'withTasks'],
};

const builder = new Builder(config);
const calendar = builder.createCalendar();

console.log('isInRange' in calendar);
console.log('addTask' in calendar);
console.log(calendar);

export const DatePicker: FC = () => {
  return (
    <DarkModeProvider>
      <MainComponent calendar={calendar} />
    </DarkModeProvider>
  );
};

const MainComponent: FC<{ calendar: ICalendar }> = ({ calendar }) => {
  const { isDark } = useDarkMode();

  const {
    view,
    setView,
    weekStartsOn,
    setWeekStartsOn,
    showWeekends,
    setShowWeekends,
    showHolidays,
    setShowHolidays,
    rangeStart,
    rangeEnd,
    onStartRangeInputPick,
    onEndRangeInputPick,
    selectedDate,
    onDateSelect,
    onDateInputPick,
    pointedYear,
    currentYear,
    onNextYearClick,
    onPrevYearClick,
    onYearSelect,
    currentMonth,
    onNextMonthClick,
    onPrevMonthClick,
    onMonthSelect,
    pointedDate,
    isModalOpen,
    closeModal,
  } = useDataPicker(calendar);

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
        <RangeInput
          from={formatDateForInput(rangeStart)}
          to={formatDateForInput(rangeEnd)}
          onFromChange={onStartRangeInputPick}
          onToChange={onEndRangeInputPick}
        />
        <DateInput
          value={formatDateForInput(selectedDate)}
          onChange={onDateInputPick}
          label={'Select date'}
        />
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
          onDateSelect={onDateSelect}
          onNextMonth={onNextMonthClick}
          onPrevMonth={onPrevMonthClick}
          rangeEnd={rangeEnd}
          rangeStart={rangeStart}
        />
      )}

      {isModalOpen && hasTasksFeature(calendar) && (
        <TasksModal date={selectedDate} calendar={calendar} onClose={closeModal} />
      )}
    </ThemeProvider>
  );
};
