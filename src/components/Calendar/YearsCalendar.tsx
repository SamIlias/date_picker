import { FC } from 'react';

import { Cell } from '@/components/Calendar/Cell/Cell';
import { ICalendar } from '@/core/types';

import * as S from './styled';

const DEFAULT_YEAR_COUNT = 7;

interface YearCalendarProps {
  calendar: ICalendar;
  pointedYear: number;
  currentYear: number;
  onYearSelect: (year: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const YearsCalendar: FC<YearCalendarProps> = ({
  calendar,
  pointedYear,
  currentYear,
  onYearSelect,
  onPrev,
  onNext,
}) => {
  const calendarData = calendar.getYearsForGrid(pointedYear, DEFAULT_YEAR_COUNT);

  return (
    <S.Calendar>
      <S.CalendarHeader>
        <S.HeaderButton onClick={onPrev}>{'<<'}</S.HeaderButton>
        <S.HeaderTitle>{'Years'}</S.HeaderTitle>
        <S.HeaderButton onClick={onNext}>{'>>'}</S.HeaderButton>
      </S.CalendarHeader>

      <S.CalendarGrid>
        {calendarData.map((year, index) => (
          <Cell
            value={year}
            key={index}
            onClick={() => onYearSelect(year)}
            $isCurrent={currentYear === year}
          />
        ))}
      </S.CalendarGrid>
    </S.Calendar>
  );
};
