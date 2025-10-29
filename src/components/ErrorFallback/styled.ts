import styled, { css } from 'styled-components';

const MAX_CONTAINER_WIDTH = '400px';
const TRANSITION_DURATION = '0.2s';
const BUTTON_OUTLINE_OFFSET = '2px';

export const Container = styled.div`
  max-width: ${MAX_CONTAINER_WIDTH};
  text-align: center;

  ${({ theme }) => css`
    padding: ${theme.spacing.md};
    background: ${theme.color.background.primary};
    color: ${theme.color.text.primary};
    border: ${theme.borderThickness.thin} solid ${theme.color.red.main};
    border-radius: ${theme.spacing.sm};
    margin: ${theme.spacing.xl} auto;
  `}
`;

export const Message = styled.p`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.base};
    font-size: ${theme.fontSize.h5};
  `}
`;

export const RetryButton = styled.button`
  border: none;
  cursor: pointer;
  transition: background-color ${TRANSITION_DURATION} ease;

  ${({ theme }) => css`
    background-color: ${theme.color.red.light};
    color: ${theme.color.text.secondary};
    padding: ${theme.spacing.base} ${({ theme }) => theme.spacing.base};
    border-radius: ${theme.spacing.xs};
    &:hover {
      background-color: ${theme.color.red.dark};
    }

    &:focus {
      outline: ${BUTTON_OUTLINE_OFFSET} solid ${theme.color.red.dark};
      outline-offset: ${BUTTON_OUTLINE_OFFSET};
    }
  `}
`;
