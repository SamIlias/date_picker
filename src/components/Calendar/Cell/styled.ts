import styled, { css } from 'styled-components';

import { CellProps } from '@/components/Calendar/Cell/Cell';
import { DateCellProps } from '@/components/Calendar/Cell/DateCell';

const TRANSITION_DURATION = '0.5s';
const CELL_MIN_HEIGHT = '40px';
const CELL_MIN_HEIGHT_MOBILE = '32px';

type DateCellPropsForStyles = Omit<
  DateCellProps,
  'date' | 'onDoubleClick' | 'onClick' | 'hasTasks'
>;
type CellPropsForStyles = Pick<CellProps<number | string>, '$isCurrent'>;

export const TaskLabel = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.small};
    color: ${theme.color.red.light};
    height: 30%;
  `}
`;

export const DateNumber = styled.div`
  display: flex;
  align-items: end;
  height: 70%;
`;

export const DateCell = styled.div<DateCellPropsForStyles>`
  ${({
    theme,
    $isOtherMonth,
    $isSelected,
    $isInRange,
    $isRangeStart,
    $isRangeEnd,
    $isToday,
    $isWeekend,
    $isHoliday,
    $isDateAllowed,
  }) => css`
    padding: ${theme.spacing.sm};
    text-align: center;
    border-radius: 0;
    cursor: pointer;
    font-size: ${theme.fontSize.h1};
    font-family: ${theme.fontFamily.primary};
    font-weight: ${theme.fontWeight.regular};
    transition:
      background-color ${TRANSITION_DURATION} ease,
      color ${TRANSITION_DURATION} ease;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: ${CELL_MIN_HEIGHT};

    color: ${$isInRange
      ? theme.color.text.ranged
      : $isOtherMonth
        ? theme.color.text.placeholder
        : theme.color.text.primary};

    background-color: ${() => {
      if ($isSelected || $isRangeEnd) return theme.color.background.activeCell;
      if ($isRangeStart) return theme.color.background.rangeStartCell;
      if ($isInRange) return theme.color.background.range;
      return theme.color.background.primary;
    }};

    ${($isSelected || $isRangeEnd || $isRangeStart) &&
    css`
      color: white;
      font-weight: ${theme.fontWeight.bold};
    `}
    ${$isSelected &&
    css`
      border-radius: ${theme.borderRadius.sm};
    `}
    ${$isToday &&
    !$isSelected &&
    css`
      border: ${theme.borderThickness.medium} solid ${theme.color.background.activeCell};
    `}
    ${$isWeekend &&
    !$isSelected &&
    css`
      color: ${theme.color.red.main};
    `}
    ${$isHoliday &&
    !$isSelected &&
    css`
      color: ${theme.color.red.dark};
      font-weight: ${theme.fontWeight.semibold};
    `}
    ${$isRangeStart &&
    css`
      border-top-left-radius: ${theme.borderRadius.lg};
      border-bottom-left-radius: ${theme.borderRadius.lg};
    `}
    ${$isRangeEnd &&
    css`
      border-top-right-radius: ${theme.borderRadius.lg};
      border-bottom-right-radius: ${theme.borderRadius.lg};
    `}
    ${$isRangeStart &&
    $isRangeEnd &&
    css`
      border-radius: ${theme.borderRadius.lg};
    `}
    &:hover {
      background-color: ${$isSelected
        ? theme.color.background.activeCell
        : theme.color.background.onCellHover};
    }

    ${!$isDateAllowed &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
      background-color: ${theme.color.background.disabled};
      color: ${theme.color.text.placeholder};
    `} @media ${theme.breakpoint.mobile} {
      padding: ${theme.spacing.xs};
      font-size: ${theme.fontSize.h4};
      min-height: ${CELL_MIN_HEIGHT_MOBILE};
    }
  `}
`;

export const Cell = styled.div<CellPropsForStyles>`
  ${({ theme, $isCurrent }) => css`
    padding: ${theme.spacing.sm};
    text-align: center;
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    font-size: ${theme.fontSize.h3};
    font-family: ${theme.fontFamily.primary};
    font-weight: ${theme.fontWeight.regular};
    transition: all ${TRANSITION_DURATION};
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: ${CELL_MIN_HEIGHT};

    background-color: ${() => {
      return theme.color.background.primary;
    }};

    ${
      $isCurrent &&
      css`
        border: ${theme.borderThickness.medium} solid ${theme.color.background.activeCell};
      `
    }
    &:hover {
      background-color: ${theme.color.background.onCellHover};
    }
  ;
  }

  @media ${theme.breakpoint.mobile} {
    padding: ${theme.spacing.xs};
    font-size: ${theme.fontSize.h5};
    min-height: ${CELL_MIN_HEIGHT_MOBILE};
  }
  `}
`;
