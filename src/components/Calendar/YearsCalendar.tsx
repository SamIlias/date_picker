import { FC } from 'react';

import { NextButton, PrevButton } from '@/components/Buttons';
import { Cell } from '@/components/Calendar/Cell/Cell';
import { useContainerSize } from '@/context/SizeContext';
import { ICalendar } from '@/core/types';

import * as S from './styled';

const DEFAULT_YEAR_COUNT = 8;

interface YearCalendarProps {
  calendar: ICalendar;
  pointedYear: number;
  currentYear: number;
  onYearSelect: (value: number) => void;
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
  const containerSize = useContainerSize();

  return (
    <S.Calendar $containerSize={containerSize}>
      <S.CalendarHeader>
        <PrevButton onClick={onPrev} />
        <S.HeaderTitle $containerSize={containerSize}>{'Years'}</S.HeaderTitle>
        <NextButton onClick={onNext} />
      </S.CalendarHeader>

      <S.YearsCalendarGrid $containerSize={containerSize}>
        {calendarData.map((year) => (
          <Cell value={year} key={year} onClick={onYearSelect} $isCurrent={currentYear === year} />
        ))}
      </S.YearsCalendarGrid>
    </S.Calendar>
  );
};
