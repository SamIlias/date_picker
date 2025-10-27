import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { MonthsCalendar } from '@/components/Calendar/MonthsCalendar';
import { WeeksCalendar } from '@/components/Calendar/WeeksCalendar';
import { YearsCalendar } from '@/components/Calendar/YearsCalendar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import { TasksModal } from '@/components/TasksModal';
import { SizeContext } from '@/context/SizeContext';
import { formatDateForInput, Views } from '@/core/constants';
import { hasRangeFeature } from '@/core/decorators/RangeCalendarDecorator';
import { hasTasksFeature } from '@/core/decorators/TasksCalendarDecorator';
import { ICalendar } from '@/core/types';
import { GlobalStyle } from '@/GlobalStyles';
import { AppWrapper } from '@/styled';
import { darkTheme, lightTheme, ThemeColor } from '@/theme/theme';
import { useDataPicker } from '@/useDataPicker';

import { ControlPanel } from './components/ControlPanel';

export type DatePickerProps = {
  calendar: ICalendar;
  customDate: Date;
  customCallback: (date: Date) => void;
  theme?: ThemeColor;
  showHolidaysCustom?: boolean;
  showWeekendsCustom?: boolean;
};

export const DatePicker: FC<DatePickerProps> = ({
  calendar,
  customDate,
  customCallback,
  theme = ThemeColor.LIGHT,
  showWeekendsCustom,
  showHolidaysCustom,
}) => {
  const {
    view,
    setView,
    weekStartsOn,
    setWeekStartsOn,
    showWeekends,
    showHolidays,
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
    ref,
    containerSize,
  } = useDataPicker(calendar, customDate, customCallback, showHolidaysCustom, showWeekendsCustom);

  const isDark = theme === ThemeColor.DARK;

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SizeContext value={containerSize}>
          <AppWrapper ref={ref}>
            <GlobalStyle />
            <ControlPanel
              view={view}
              onViewChange={setView}
              weekStartsOn={weekStartsOn}
              onWeekStartsOnChange={setWeekStartsOn}
              from={formatDateForInput(rangeStart)}
              to={formatDateForInput(rangeEnd)}
              onFromChange={onStartRangePick}
              onToChange={onEndRangePick}
              selectedDate={selectedDate}
              onDateInputPick={onDateInputPick}
              hasRangeFeature={hasRangeFeature(calendar)}
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
          </AppWrapper>
        </SizeContext>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
