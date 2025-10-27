import styled, { css } from 'styled-components';

import { buttonBaseStyles } from '@/components/commonStyles';
import { ContainerSize } from '@/context/SizeContext';
import { ContainerSizeProps } from '@/styled';

export { DateInput, DateInputField, Label } from '@/components/ControlPanel/DateInput/styled';

const BUTTON_HEIGHT = '36px';

export const RangeInput = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    display: flex;
    width: 100%;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.base};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
  `}
`;

export const ClearButton = styled.button<ContainerSizeProps>`
  ${buttonBaseStyles}
  ${({ $containerSize }) => css`
    align-self: end;
    height: ${BUTTON_HEIGHT};

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      align-self: stretch;
    `}
  `}
`;
