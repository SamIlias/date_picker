import { FC } from 'react';

import { NextButton, PrevButton } from '@/components/Buttons';
import { DateCell } from '@/components/Calendar/Cell/DateCell';
import {
  monthNames,
  Views,
  weekDaysStartsMonday,
  weekDaysStartsSunday,
  WeekStartsOn,
} from '@/core/constants';
import { hasDateLimitsFeature } from '@/core/decorators/DateLimitsCalendarDecorator';
import { hasRangeFeature } from '@/core/decorators/RangeCalendarDecorator';
import { hasTasksFeature } from '@/core/decorators/TasksCalendarDecorator';
import { ICalendar } from '@/core/types';

import * as S from './styled';

interface CalendarProps {
  calendar: ICalendar;
  pointedDate: Date;
  selectedDate: Date;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  weekStartsOn: WeekStartsOn;
  showWeekends: boolean;
  showHolidays: boolean;
  holidays: Date[];
  onDateSelect: (date: Date) => void;
  openTasks: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onViewChange: (view: Views) => void;
}

export const WeeksCalendar: FC<CalendarProps> = ({
  calendar,
  pointedDate,
  selectedDate,
  rangeStart,
  rangeEnd,
  weekStartsOn,
  showWeekends,
  showHolidays,
  onDateSelect,
  openTasks,
  onPrevMonth,
  onNextMonth,
  onViewChange,
}) => {
  const weekDays =
    weekStartsOn === WeekStartsOn.MONDAY ? weekDaysStartsMonday : weekDaysStartsSunday;
  const calendarDays = calendar.getDaysForMonthGrid(pointedDate, weekStartsOn);

  const holidays = calendar.config.holidays;

  const handleDateClick = (date: Date) => {
    onDateSelect(date);
  };

  const handleMonthClick = () => {
    onViewChange(Views.MONTHS);
  };

  return (
    <S.Calendar>
      <S.CalendarHeader>
        <PrevButton onClick={onPrevMonth} />
        <S.HeaderTitle $isClickable={true} onClick={handleMonthClick}>
          {monthNames[pointedDate.getMonth()]} {pointedDate.getFullYear()}
        </S.HeaderTitle>
        <NextButton onClick={onNextMonth} />
      </S.CalendarHeader>

      <S.CalendarGrid>
        {weekDays.map((day) => (
          <S.WeekDayHeader key={day}>{day}</S.WeekDayHeader>
        ))}

        {calendarDays.flat().map((date) => (
          <DateCell
            date={date}
            key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
            onClick={handleDateClick}
            hasTasks={hasTasksFeature(calendar) && !!calendar.getTasks(date).length}
            onDoubleClick={openTasks}
            $isToday={calendar.isToday(date)}
            $isSelected={calendar.isSameDay(date, selectedDate)}
            $isInRange={
              hasRangeFeature(calendar) && rangeStart && rangeEnd
                ? calendar.isInRange(date, rangeStart, rangeEnd)
                : false
            }
            $isRangeStart={calendar.isSameDay(date, rangeStart)}
            $isRangeEnd={calendar.isSameDay(date, rangeEnd)}
            $isOtherMonth={calendar.isOtherMonth(date, pointedDate)}
            $isWeekend={showWeekends && calendar.isWeekend(date)}
            $isHoliday={showHolidays && calendar.isHoliday(date, holidays)}
            $isDateAllowed={hasDateLimitsFeature(calendar) ? calendar.isDateAllowed(date) : true}
          />
        ))}
      </S.CalendarGrid>
    </S.Calendar>
  );
};
