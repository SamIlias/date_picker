import styled, { css } from 'styled-components';

const TRANSITION_DURATION = '0.2s';
const SHADOW = '0 2px 8px rgba(0, 0, 0, 0.1)';
const HEADER_BUTTON_MIN_WIDTH = '80px';
const HEADER_BUTTON_MIN_WIDTH_MOBILE = '60px';

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
    margin-bottom: ${theme.spacing.md};
    gap: ${theme.spacing.base};
  `}
`;

export const HeaderButton = styled.button`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border: ${theme.borderThickness.thin} solid ${theme.color.text.placeholder};
    border-radius: ${theme.borderRadius.sm};
    background-color: ${theme.color.background.primary};
    color: ${theme.color.text.primary};
    font-size: ${theme.fontSize.h6};
    font-weight: ${theme.fontWeight.medium};
    font-family: ${theme.fontFamily.primary};
    cursor: pointer;
    transition: all ${TRANSITION_DURATION};
    min-width: ${HEADER_BUTTON_MIN_WIDTH};

    &:hover {
      background-color: ${theme.color.background.onCellHover};
      border-color: ${theme.color.text.secondary};
    }

    &:active {
      transform: scale(0.98);
    }

    @media ${theme.breakpoint.mobile} {
      min-width: ${HEADER_BUTTON_MIN_WIDTH_MOBILE};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.fontSize.small};
    }
  `}
`;

export const HeaderTitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.color.text.primary};
    font-family: ${theme.fontFamily.primary};
    text-align: center;
    flex: 1;

    @media ${theme.breakpoint.mobile} {
      font-size: ${theme.fontSize.h4};
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

export const WeekDayHeader = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm};
    text-align: center;
    font-size: ${theme.fontSize.h6};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.color.text.secondary};
    font-family: ${theme.fontFamily.primary};

    @media ${theme.breakpoint.mobile} {
      padding: ${theme.spacing.xs};
      font-size: ${theme.fontSize.small};
    }
  `}
`;
