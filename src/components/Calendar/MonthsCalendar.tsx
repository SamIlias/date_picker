import { FC } from 'react';

import { Cell } from '@/components/Calendar/Cell/Cell';
import { monthNames, Views } from '@/core/constants';
import { MonthNames } from '@/core/types';

import * as S from './styled';

interface MonthCalendarProps {
  currentMonth: MonthNames;
  onMonthSelect: (month: MonthNames) => void;
  onViewChange: (view: Views) => void;
  selectedYear: number;
}

export const MonthsCalendar: FC<MonthCalendarProps> = ({
  currentMonth,
  onMonthSelect,
  onViewChange,
  selectedYear,
}) => {
  const handleYearClick = () => {
    onViewChange(Views.YEARS);
  };

  return (
    <S.Calendar>
      <S.CalendarHeader>
        <S.HeaderTitle $isClickable={true} onClick={handleYearClick}>
          {selectedYear}
        </S.HeaderTitle>
      </S.CalendarHeader>

      <S.MonthsCalendarGrid>
        {monthNames.map((month) => (
          <Cell
            value={month}
            key={month}
            onClick={onMonthSelect}
            $isCurrent={currentMonth === month}
          />
        ))}
      </S.MonthsCalendarGrid>
    </S.Calendar>
  );
};
