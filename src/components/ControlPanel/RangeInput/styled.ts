import styled, { css } from 'styled-components';

import { buttonBaseStyles } from '@/components/commonStyles';

export { DateInput, DateInputField, Label } from '@/components/ControlPanel/DateInput/styled';

const BUTTON_HEIGHT = '36px';

export const RangeInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.base};

    @media screen and ${theme.breakpoint.mobile} {
      flex-direction: column;
      align-items: stretch;
    }
  `}
`;

export const ClearButton = styled.button`
  ${buttonBaseStyles}

  ${({ theme }) => css`
    align-self: end;
    height: ${BUTTON_HEIGHT};

    @media screen and ${theme.breakpoint.mobile} {
      align-self: stretch;
    }
  `}
`;
