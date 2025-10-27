import styled, { css } from 'styled-components';

import { ContainerSize } from '@/context/SizeContext';
import { ContainerSizeProps } from '@/styled';

const SHADOW = '0 2px 8px rgba(0, 0, 0, 0.1)';
const GRID_GAP = '1px';

export const Calendar = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.background.primary};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.md};
    box-shadow: ${SHADOW};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      padding: ${theme.spacing.sm};
    `}
  `}
`;

export const CalendarHeader = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.sm};
  `}
`;

interface HeaderTitleProps {
  $isClickable?: boolean;
}

export const HeaderTitle = styled.span<HeaderTitleProps & ContainerSizeProps>`
  ${({ theme, $isClickable = false, $containerSize }) => css`
    font-size: ${theme.fontSize.h2};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.color.text.primary};
    font-family: ${theme.fontFamily.primary};
    text-align: center;
    flex: 1;
    cursor: ${$isClickable ? 'pointer' : 'auto'};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      font-size: ${theme.fontSize.h5};
    `}
  `}
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: ${GRID_GAP};
`;

export const YearsCalendarGrid = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.xs};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      gap: ${theme.spacing.xs};
      grid-template-columns: repeat(4, 1fr);
    `}
  `}
`;

export const MonthsCalendarGrid = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.xs};

    ${$containerSize === ContainerSize.MEDIUM &&
    css`
      gap: ${theme.spacing.xs};
      grid-template-columns: repeat(3, 1fr);
    `}

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      gap: ${theme.spacing.xs};
      grid-template-columns: repeat(2, 1fr);
    `}
  `}
`;

export const WeekDayCell = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    text-align: center;
    font-size: ${theme.fontSize.h2};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.color.text.secondary};
    font-family: ${theme.fontFamily.primary};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      padding: ${theme.spacing.xs};
      font-size: ${theme.fontSize.h6};
    `}
  `}
`;
