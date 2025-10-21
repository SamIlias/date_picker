import styled, { css } from 'styled-components';

const TRANSITION_DURATION = '0.2s';

export const DateInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  max-width: 30%;

  @media ${({ theme }) => theme.breakpoint.mobile} {
    max-width: 100%;
  }
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.h6};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.color.text.primary};
    font-family: ${theme.fontFamily.primary};
  `}
`;

export const DateInputField = styled.input.attrs({ type: 'date' })`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border: ${theme.borderThickness.thin} solid ${theme.color.text.placeholder};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSize.h6};
    font-family: ${theme.fontFamily.primary};
    color: ${theme.color.text.primary};
    background-color: ${theme.color.background.primary};
    transition: border-color ${TRANSITION_DURATION};

    &:hover {
      border-color: ${theme.color.text.secondary};
    }

    &:focus {
      outline: none;
      border-color: ${theme.color.background.activeCell};
    }

    &::placeholder {
      color: ${theme.color.text.placeholder};
    }
  `}
`;
