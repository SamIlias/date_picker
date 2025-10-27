import { FC } from 'react';

import { useContainerSize } from '@/context/SizeContext';

import * as S from './styled';
import { DateNumber, TaskLabel } from './styled';

export interface DateCellProps {
  date: Date;
  onClick: (date: Date) => void;
  onDoubleClick: () => void;
  hasTasks: boolean;
  $isToday?: boolean;
  $isSelected?: boolean;
  $isInRange?: boolean;
  $isRangeStart?: boolean;
  $isRangeEnd?: boolean;
  $isOtherMonth?: boolean;
  $isWeekend?: boolean;
  $isHoliday?: boolean;
  $isDateAllowed?: boolean;
}

export const DateCell: FC<DateCellProps> = ({
  date,
  onClick,
  onDoubleClick,
  hasTasks,
  $isToday,
  $isSelected,
  $isInRange,
  $isRangeStart,
  $isRangeEnd,
  $isOtherMonth,
  $isWeekend,
  $isHoliday,
  $isDateAllowed,
}) => {
  const onCellClick = () => {
    onClick(date);
  };

  const containerSize = useContainerSize();

  return (
    <S.DateCell
      $containerSize={containerSize}
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
      $isDateAllowed={$isDateAllowed}
    >
      <DateNumber $containerSize={containerSize}>{date.getDate()}</DateNumber>
      <TaskLabel $containerSize={containerSize}>{hasTasks ? '☀' : ''}</TaskLabel>
    </S.DateCell>
  );
};
