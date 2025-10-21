import { FC } from 'react';

import { Cell } from '@/components/Calendar/Cell/Cell';
import { monthNames } from '@/core/constants';
import { MonthNames } from '@/core/types';

import * as S from './styled';

interface MonthCalendarProps {
  currentMonth: MonthNames;
  onMonthSelect: (month: MonthNames) => void;
}

export const MonthsCalendar: FC<MonthCalendarProps> = ({ currentMonth, onMonthSelect }) => {
  return (
    <S.Calendar>
      <S.CalendarHeader>
        <S.HeaderTitle>{'Months'}</S.HeaderTitle>
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
