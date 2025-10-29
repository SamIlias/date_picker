import styled, { css } from 'styled-components';

import { ContainerSize } from '@/context/SizeContext';
import { ContainerSizeProps } from '@/styled';

import { buttonBaseStyles } from '../commonStyles';

const MAX_HEIGHT = '600px';
const HIDDEN_Y_POSITION = '-10px';
const SHADOW = '0 2px 8px rgba(0, 0, 0, 0.1)';

export const ControlPanel = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin-bottom: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${SHADOW};
    padding: ${theme.spacing.xs};
    box-sizing: border-box;
  `}
`;

export const ToggleButton = styled.button<ContainerSizeProps>`
  ${buttonBaseStyles}
  ${({ theme, $containerSize }) => css`
    align-self: end;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      font-size: ${theme.fontSize.small};
    `}
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
