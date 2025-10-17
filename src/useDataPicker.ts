import { useState } from 'react';

import { monthNames } from '@/core/constants';
import { ICalendar, MonthNames } from '@/core/types';

export const useDataPicker = (calendar: ICalendar) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];

  const [view, setView] = useState(calendar.config.view);
  const [showWeekends, setShowWeekends] = useState(calendar.config.showWeekends);
  const [weekStartsOn, setWeekStartsOn] = useState(calendar.config.weekStartsOn);
  const [showHolidays, setShowHolidays] = useState(!!calendar.config.holidays.length);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [pointedDate, setPointedDate] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [pointedYear, setPointedYear] = useState(pointedDate.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const onDateInputPick = (value: string) => {
    const pickedDate = new Date(value);
    setSelectedDate(pickedDate);
    setPointedDate(pickedDate);
  };

  const onStartRangeInputPick = (value: string) => {
    const pickedDate = new Date(value);
    if (rangeEnd && pickedDate > rangeEnd) {
      setRangeStart(rangeEnd);
      setRangeEnd(pickedDate);
    } else {
      setRangeStart(pickedDate);
    }
  };

  const onEndRangeInputPick = (value: string) => {
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
    openModal();
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
    openModal,
    closeModal,
  };
};
