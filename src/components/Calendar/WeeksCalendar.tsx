import { FC } from 'react';

import { DateCell } from '@/components/Calendar/Cell/DateCell';
import { monthNames, weekDaysStartsMonday, weekDaysStartsSunday } from '@/core/constants';
import { RangeCalendarDecorator } from '@/core/decorators/RangeCalendarDecorator';
import { ICalendar, WeekStartsOn } from '@/core/types';

import * as S from './styled';

interface CalendarProps {
  calendar: ICalendar;
  pointedDate: Date;
  selectedDate: Date;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  weekStartsOn: WeekStartsOn;
  showWeekends: boolean;
  holidays: Date[];
  onDateSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const WeeksCalendar: FC<CalendarProps> = ({
  calendar,
  pointedDate,
  selectedDate,
  rangeStart,
  rangeEnd,
  weekStartsOn,
  showWeekends,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
}) => {
  const weekDays = weekStartsOn === 'monday' ? weekDaysStartsMonday : weekDaysStartsSunday;
  const calendarDays = calendar.getDaysForMonthGrid(pointedDate, weekStartsOn);

  const holidays = calendar.config.holidays;

  return (
    <S.Calendar>
      <S.CalendarHeader>
        <S.HeaderButton onClick={onPrevMonth}>{'<<'}</S.HeaderButton>
        <S.HeaderTitle>
          {monthNames[pointedDate.getMonth()]} {pointedDate.getFullYear()}
        </S.HeaderTitle>
        <S.HeaderButton onClick={onNextMonth}>{'>>'}</S.HeaderButton>
      </S.CalendarHeader>

      <S.CalendarGrid>
        {weekDays.map((day) => (
          <S.WeekDayHeader key={day}>{day}</S.WeekDayHeader>
        ))}

        {calendarDays.flat().map((date, index) => (
          <DateCell
            date={date}
            key={index}
            onClick={() => onDateSelect(date)}
            $isToday={calendar.isToday(date)}
            $isSelected={calendar.isSameDay(date, selectedDate)}
            $isInRange={
              calendar instanceof RangeCalendarDecorator && rangeStart && rangeEnd
                ? calendar.isInRange(date, rangeStart, rangeEnd)
                : false
            }
            $isRangeStart={calendar.isSameDay(date, rangeStart)}
            $isRangeEnd={calendar.isSameDay(date, rangeEnd)}
            $isOtherMonth={calendar.isOtherMonth(date, pointedDate)}
            $isWeekend={showWeekends && calendar.isWeekend(date)}
            $isHoliday={calendar.isHoliday(date, holidays)}
          />
        ))}
      </S.CalendarGrid>
    </S.Calendar>
  );
};
