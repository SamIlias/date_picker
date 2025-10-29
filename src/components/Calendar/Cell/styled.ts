import styled, { css } from 'styled-components';

import { CellProps } from '@/components/Calendar/Cell/Cell';
import { DateCellProps } from '@/components/Calendar/Cell/DateCell';
import { ContainerSize } from '@/context/SizeContext';
import { ContainerSizeProps } from '@/styled';

const TRANSITION_DURATION = '0.5s';
const CELL_MIN_HEIGHT = '20px';
const CELL_MIN_HEIGHT_COMPACT = '8px';

type DateCellPropsForStyles = Omit<
  DateCellProps,
  'date' | 'onDoubleClick' | 'onClick' | 'hasTasks'
>;
type CellPropsForStyles = Pick<CellProps<number | string>, '$isCurrent'>;

export const TaskLabel = styled.span<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    align-self: start;
    font-size: ${theme.fontSize.h3};
    color: ${theme.color.red.light};

    ${$containerSize === ContainerSize.MEDIUM &&
    css`
      align-self: center;
      font-size: ${theme.fontSize.h5};
    `}

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      align-self: center;
      font-size: ${theme.fontSize.small};
    `}
  `}
`;

export const DateNumber = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    font-size: ${theme.fontSize.h1};
    align-self: end;
    padding-bottom: ${theme.spacing.base};

    ${$containerSize === ContainerSize.MEDIUM &&
    css`
      font-size: ${theme.fontSize.h4};
      padding-bottom: 0;
    `}

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      font-size: ${theme.fontSize.h6};
      padding-bottom: 0;
    `}
  `}
`;

export const DateCell = styled.div<DateCellPropsForStyles & ContainerSizeProps>`
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
    $containerSize,
  }) => css`
    text-align: center;
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    font-family: ${theme.fontFamily.primary};
    font-weight: ${theme.fontWeight.regular};
    transition:
      background-color ${TRANSITION_DURATION} ease,
      color ${TRANSITION_DURATION} ease;
    aspect-ratio: 1;
    display: grid;
    grid-template-rows: 65% 35%;

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

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      font-size: ${theme.fontSize.h6};
      min-height: ${CELL_MIN_HEIGHT_COMPACT};
    `}
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
    `}
  `}
`;

export const Cell = styled.div<CellPropsForStyles & ContainerSizeProps>`
  ${({ theme, $isCurrent, $containerSize }) => css`
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    color: ${theme.color.text.primary};
    cursor: pointer;
    font-size: ${theme.fontSize.h3};
    font-family: ${theme.fontFamily.primary};
    font-weight: ${theme.fontWeight.regular};
    transition: all ${TRANSITION_DURATION};
    display: flex;
    align-items: center;
    border: ${theme.borderThickness.thin} solid ${theme.color.border.plain};
    justify-content: center;
    height: ${CELL_MIN_HEIGHT};

    background-color: ${() => {
      return theme.color.background.primary;
    }};

    ${$isCurrent &&
    css`
      border: ${theme.borderThickness.medium} solid ${theme.color.background.activeCell};
    `}
    &:hover {
      background-color: ${theme.color.background.onCellHover};
    }

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      padding: ${theme.spacing.xs};
      min-height: ${CELL_MIN_HEIGHT_COMPACT};
      font-size: ${theme.fontSize.h6};
    `}
  `}
`;
