import { FC } from 'react';

import * as S from './styled';

export interface DateCellProps {
  date: Date;
  onClick: (date: Date) => void;
  onDoubleClick: () => void;
  $isToday?: boolean;
  $isSelected?: boolean;
  $isInRange?: boolean;
  $isRangeStart?: boolean;
  $isRangeEnd?: boolean;
  $isOtherMonth?: boolean;
  $isWeekend?: boolean;
  $isHoliday?: boolean;
}

export const DateCell: FC<DateCellProps> = ({
  date,
  onClick,
  onDoubleClick,
  $isToday,
  $isSelected,
  $isInRange,
  $isRangeStart,
  $isRangeEnd,
  $isOtherMonth,
  $isWeekend,
  $isHoliday,
}) => {
  const onCellClick = () => {
    onClick(date);
  };
  return (
    <S.DateCell
      onDoubleClick={onDoubleClick}
      onClick={onCellClick}
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
