import styled, { css } from 'styled-components';

const HEADER_BUTTON_MIN_WIDTH = '40px';
const TRANSITION_DURATION = '0.2s';
const HEADER_BUTTON_MIN_WIDTH_MOBILE = '60px';

export const Button = styled.button`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border: none;
    background-color: ${theme.color.background.primary};
    color: ${theme.color.text.primary};
    font-size: ${theme.fontSize.h3};
    font-weight: ${theme.fontWeight.bold};
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
