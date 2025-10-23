import styled, { css } from 'styled-components';

const MAX_HEIGHT = '600px';
const HIDDEN_Y_POSITION = '-10px';

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export const ToggleButton = styled.button`
  ${({ theme }) => css`
    align-self: end;
    margin-bottom: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.base};
    border: none;
    border-radius: ${theme.borderRadius.sm};
    background: ${theme.color.background.button};
    color: ${theme.color.text.contrast};
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${theme.color.background.button};
    }

    &:active {
      transform: scale(0.97);
    }
  `}
`;

export const AnimatedPanel = styled.div<{ $visible: boolean }>`
  overflow: hidden;
  transition:
    max-height 0.4s ease,
    opacity 0.4s ease,
    transform 0.4s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          max-height: ${MAX_HEIGHT};
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          max-height: 0;
          transform: translateY(${HIDDEN_Y_POSITION});
        `}
`;
