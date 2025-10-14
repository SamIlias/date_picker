import styled, { css } from 'styled-components';

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => css`
    gap: ${theme.spacing.base};
    padding: ${theme.spacing.md};
    background-color: ${theme.color.background.primary};
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.md};

    @media ${theme.breakpoint.mobile} {
      padding: ${theme.spacing.sm};
      gap: ${theme.spacing.sm};
    }

    @media ${theme.breakpoint.tablet} {
      padding: ${theme.spacing.base};
    }
  `}
`;
