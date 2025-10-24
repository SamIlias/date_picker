import styled, { css } from 'styled-components';

import { buttonBaseStyles } from '../commonStyles';

const MAX_HEIGHT = '600px';
const HIDDEN_Y_POSITION = '-10px';

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export const ToggleButton = styled.button`
  ${buttonBaseStyles}
  ${({ theme }) => css`
    align-self: end;
    margin-bottom: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.base};
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
