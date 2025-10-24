import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { MonthsCalendar } from '@/components/Calendar/MonthsCalendar';
import { WeeksCalendar } from '@/components/Calendar/WeeksCalendar';
import { YearsCalendar } from '@/components/Calendar/YearsCalendar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import { TasksModal } from '@/components/TasksModal';
import { DarkModeProvider, useDarkMode } from '@/context/darkModeContext';
import { formatDateForInput, Views } from '@/core/constants';
import { hasTasksFeature } from '@/core/decorators/TasksCalendarDecorator';
import { ICalendar } from '@/core/types';
import { GlobalStyle } from '@/GlobalStyles';
import { darkTheme, lightTheme } from '@/theme/theme';
import { useDataPicker } from '@/useDataPicker';

import { ControlPanel } from './components/ControlPanel';

export type DatePickerProps = {
  calendar: ICalendar;
  customDate: Date;
  customCallback: (date: Date) => void;
};

export const DatePicker: FC<DatePickerProps> = ({ calendar, customDate, customCallback }) => {
  return (
    <DarkModeProvider>
      <MainComponent calendar={calendar} customDate={customDate} customCallback={customCallback} />
    </DarkModeProvider>
  );
};

export const MainComponent: FC<DatePickerProps> = ({ calendar, customDate, customCallback }) => {
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
    onStartRangePick,
    onEndRangePick,
    selectedDate,
    onDateSelect,
    onDateInputPick,
    pointedYear,
    selectedYear,
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
  } = useDataPicker(calendar, customDate, customCallback);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GlobalStyle />
        <ControlPanel
          view={view}
          onViewChange={setView}
          weekStartsOn={weekStartsOn}
          onWeekStartsOnChange={setWeekStartsOn}
          showWeekends={showWeekends}
          onShowWeekendsChange={setShowWeekends}
          showHolidays={showHolidays}
          onShowHolidaysChange={setShowHolidays}
          from={formatDateForInput(rangeStart)}
          to={formatDateForInput(rangeEnd)}
          onFromChange={onStartRangePick}
          onToChange={onEndRangePick}
          selectedDate={selectedDate}
          onDateInputPick={onDateInputPick}
        />

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
          <MonthsCalendar
            currentMonth={currentMonth}
            selectedYear={selectedYear}
            onMonthSelect={onMonthSelect}
            onViewChange={setView}
          />
        )}

        {view === Views.WEEKS && (
          <WeeksCalendar
            calendar={calendar}
            onViewChange={setView}
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
      </ErrorBoundary>
    </ThemeProvider>
  );
};
