import styled, { css } from 'styled-components';

export { DateInputField, Label } from '@/components/ControlPanel/DateInput/styled';

const MAX_DATE_INPUT_WIDTH = '300px';

export const RangeInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.base};
    align-items: flex-end;

    @media screen and ${theme.breakpoint.mobile} {
      flex-direction: column;
      align-items: stretch;
    }
  `}
`;

export const DateInputGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
    flex: 1;
  `}
`;

export const DateInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
    max-width: ${MAX_DATE_INPUT_WIDTH};

    @media ${theme.breakpoint.mobile} {
      max-width: 100%;
    }
  `}
`;
