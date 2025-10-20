import { css } from 'styled-components';

export const buttonBaseStyles = css`
  ${({ theme }) => css`
    background: ${theme.color.background.button};
    color: ${theme.color.text.contrast};
    border: none;
    border-radius: ${theme.borderRadius.sm};
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    cursor: pointer;
    font-weight: ${theme.fontWeight.medium};
    transition:
      transform 0.1s ease,
      background 0.2s ease;

    &:hover {
      background: ${theme.color.text.ranged};
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      background: ${theme.color.background.disabled};
      color: ${theme.color.text.secondary};
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
    }
  `}
`;
