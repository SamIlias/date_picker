import { FC } from 'react';

import * as S from './styled';

export interface CellProps {
  date: Date;
  onClick: () => void;
  $isToday?: boolean;
  $isSelected?: boolean;
  $isInRange?: boolean;
  $isRangeStart?: boolean;
  $isRangeEnd?: boolean;
  $isOtherMonth?: boolean;
  $isWeekend?: boolean;
  $isHoliday?: boolean;
}

export const DateCell: FC<CellProps> = ({
  date,
  onClick,
  $isToday,
  $isSelected,
  $isInRange,
  $isRangeStart,
  $isRangeEnd,
  $isOtherMonth,
  $isWeekend,
  $isHoliday,
}) => {
  return (
    <S.DateCell
      onClick={onClick}
      $isToday={$isToday}
      $isSelected={$isSelected}
      $isInRange={$isInRange}
      $isRangeStart={$isRangeStart}
      $isRangeEnd={$isRangeEnd}
      $isOtherMonth={$isOtherMonth}
      $isWeekend={$isWeekend}
      $isHoliday={$isHoliday}
    >
      {date.getDate()}
    </S.DateCell>
  );
};
