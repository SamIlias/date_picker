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
import {
  FeatureType,
  formatDateForInput,
  holidaysBel,
  Views,
  WeekStartsOn,
} from '@/core/constants';
import { hasTasksFeature } from '@/core/decorators/TasksCalendarDecorator';
import { CalendarConfig, ICalendar } from '@/core/types';
import { darkTheme, lightTheme } from '@/theme/theme';
import { useDataPicker } from '@/useDataPicker';

import { ControlPanel } from './components/ControlPanel';

const config: CalendarConfig = {
  view: Views.WEEKS,
  weekStartsOn: WeekStartsOn.MONDAY,
  initialDate: new Date(),
  minDate: new Date(2025, 3, 10),
  maxDate: new Date(2025, 11, 9),
  showWeekends: true,
  holidays: holidaysBel,
  features: [FeatureType.WITH_RANGE, FeatureType.WITH_TASKS, FeatureType.WITH_DATE_LIMITS],
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
    openTasksModal,
    closeTasksModal,
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

      {view === Views.YEARS && (
        <YearsCalendar
          calendar={calendar}
          pointedYear={pointedYear}
          currentYear={currentYear}
          onNext={onNextYearClick}
          onPrev={onPrevYearClick}
          onYearSelect={onYearSelect}
        />
      )}

      {view === Views.MONTHS && (
        <MonthsCalendar currentMonth={currentMonth} onMonthSelect={onMonthSelect} />
      )}

      {view === Views.WEEKS && (
        <WeeksCalendar
          calendar={calendar}
          pointedDate={pointedDate}
          selectedDate={selectedDate}
          showWeekends={showWeekends}
          showHolidays={showHolidays}
          weekStartsOn={weekStartsOn}
          holidays={calendar.config.holidays}
          onDateSelect={onDateSelect}
          openTasks={openTasksModal}
          onNextMonth={onNextMonthClick}
          onPrevMonth={onPrevMonthClick}
          rangeEnd={rangeEnd}
          rangeStart={rangeStart}
        />
      )}

      {isModalOpen && hasTasksFeature(calendar) && (
        <TasksModal date={selectedDate} calendar={calendar} onClose={closeTasksModal} />
      )}
    </ThemeProvider>
  );
};
