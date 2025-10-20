import styled, { css } from 'styled-components';

const SHADOW = '0 2px 8px rgba(0, 0, 0, 0.1)';

export const Calendar = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.background.primary};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.md};
    box-shadow: ${SHADOW};

    @media ${theme.breakpoint.mobile} {
      padding: ${theme.spacing.sm};
    }
  `}
`;

export const CalendarHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.spacing.base};
  `}
`;

interface HeaderTitleProps {
  $isClickable?: boolean;
}

export const HeaderTitle = styled.h2<HeaderTitleProps>`
  ${({ theme, $isClickable = false }) => css`
    font-size: ${theme.fontSize.h2};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.color.text.primary};
    font-family: ${theme.fontFamily.primary};
    text-align: center;
    flex: 1;
    cursor: ${$isClickable ? 'pointer' : 'auto'};

    @media ${theme.breakpoint.mobile} {
      font-size: ${theme.fontSize.h3};
    }
  `}
`;

export const CalendarGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: ${theme.spacing.xs};

    @media ${theme.breakpoint.mobile} {
      gap: ${theme.spacing.xs};
    }
  `}
`;

export const MonthsCalendarGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.xs};

    @media ${theme.breakpoint.mobile} {
      gap: ${theme.spacing.xs};
    }
  `}
`;

export const WeekDayHeader = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm};
    text-align: center;
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.color.text.secondary};
    font-family: ${theme.fontFamily.primary};

    @media ${theme.breakpoint.mobile} {
      padding: ${theme.spacing.xs};
      font-size: ${theme.fontSize.h4};
    }
  `}
`;
