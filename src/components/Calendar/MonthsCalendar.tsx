import { FC } from 'react';

import { Cell } from '@/components/Calendar/Cell/Cell';
import { useContainerSize } from '@/context/SizeContext';
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

  const containerSize = useContainerSize();

  return (
    <S.Calendar $containerSize={containerSize}>
      <S.CalendarHeader>
        <S.HeaderTitle $containerSize={containerSize} $isClickable={true} onClick={handleYearClick}>
          {selectedYear}
        </S.HeaderTitle>
      </S.CalendarHeader>

      <S.MonthsCalendarGrid $containerSize={containerSize}>
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
