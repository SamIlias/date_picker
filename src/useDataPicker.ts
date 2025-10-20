import { useState } from 'react';

import { monthNames, Views } from '@/core/constants';
import { ICalendar, MonthNames } from '@/core/types';

export const useDataPicker = (
  calendar: ICalendar,
  customDate?: Date,
  customCallback?: (date: Date) => void,
) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];

  const [view, setView] = useState(calendar.config.view);
  const [showWeekends, setShowWeekends] = useState(calendar.config.showWeekends);
  const [weekStartsOn, setWeekStartsOn] = useState(calendar.config.weekStartsOn);
  const [showHolidays, setShowHolidays] = useState(!!calendar.config.holidays.length);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [pointedDate, setPointedDate] = useState(customDate ?? currentDate);
  const [selectedDate, setSelectedDate] = useState(customDate ?? new Date());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [pointedYear, setPointedYear] = useState(pointedDate.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTasksModal = () => setIsModalOpen(true);
  const closeTasksModal = () => setIsModalOpen(false);

  const onNextYearClick = () => {
    setPointedYear((prevYear) => prevYear + 1);
  };

  const onPrevYearClick = () => {
    setPointedYear((prevYear) => prevYear - 1);
  };

  const onNextMonthClick = () => {
    setPointedDate((prev) => calendar.nextMonthDay(prev));
  };

  const onPrevMonthClick = () => {
    setPointedDate((prev) => calendar.prevMonthDay(prev));
  };

  const onYearSelect = (year: number) => {
    setSelectedYear(year);
    setView(Views.MONTHS);
  };

  const onMonthSelect = (month: MonthNames) => {
    const monthIndex = monthNames.indexOf(month);
    const newCurrentDate = new Date(selectedYear, monthIndex, currentDate.getDate());
    setPointedDate(newCurrentDate);
    setView(Views.WEEKS);
  };

  const onDateInputPick = (value: string) => {
    const pickedDate = new Date(value);
    setSelectedDate(pickedDate);
    setPointedDate(pickedDate);
    if (customCallback) {
      customCallback(pickedDate);
    }
  };

  const onStartRangePick = (value: string | null) => {
    if (!value) {
      setRangeStart(null);
      return;
    }

    const pickedDate = new Date(value);
    if (rangeEnd && pickedDate > rangeEnd) {
      setRangeStart(rangeEnd);
      setRangeEnd(pickedDate);
    } else {
      setRangeStart(pickedDate);
    }
  };

  const onEndRangePick = (value: string | null) => {
    if (!value) {
      setRangeEnd(null);
      return;
    }

    const pickedDate = new Date(value);
    if (rangeStart && pickedDate < rangeStart) {
      setRangeEnd(rangeStart);
      setRangeStart(pickedDate);
    } else {
      setRangeEnd(pickedDate);
    }
  };

  const onDateSelect = (date: Date) => {
    setSelectedDate(date);

    if (customCallback) {
      customCallback(date);
    }
  };

  return {
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
  };
};
