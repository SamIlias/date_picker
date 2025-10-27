import styled, { css } from 'styled-components';

import { ContainerSize } from '@/context/SizeContext';
import { ContainerSizeProps } from '@/styled';

const MIN_SELECT_WIDTH = '150px';
const CHECKBOX_SIZE = '18px';
const TRANSITION_DURATION = '0.2s';

export const Settings = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.base};
    margin-bottom: ${theme.spacing.base};
  `}
`;

export const SelectGroup = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    display: flex;
    gap: ${theme.spacing.base};
    flex-wrap: wrap;

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      flex-direction: column;
      gap: ${theme.spacing.sm};
    `}
  `}
`;

export const SelectContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
    flex: 1;
    min-width: ${MIN_SELECT_WIDTH};
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.h6};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.color.text.primary};
    font-family: ${theme.fontFamily.primary};
  `}
`;

export const Select = styled.select`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border: ${theme.borderThickness.thin} solid ${theme.color.text.placeholder};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSize.h6};
    font-family: ${theme.fontFamily.primary};
    color: ${theme.color.text.primary};
    background-color: ${theme.color.background.primary};
    cursor: pointer;
    transition: border-color ${TRANSITION_DURATION};

    &:hover {
      border-color: ${theme.color.text.secondary};
    }

    &:focus {
      outline: none;
      border-color: ${theme.color.background.activeCell};
    }
  `}
`;

export const CheckboxGroup = styled.div<ContainerSizeProps>`
  ${({ theme, $containerSize }) => css`
    display: flex;
    gap: ${theme.spacing.base};
    align-items: center;

    ${$containerSize === ContainerSize.COMPACT &&
    css`
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.sm};
    `}
  `}
`;

export const CheckboxLabel = styled.label`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    font-size: ${theme.fontSize.h6};
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.color.text.primary};
    font-family: ${theme.fontFamily.primary};
    cursor: pointer;
  `}
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  ${({ theme }) => css`
    width: ${CHECKBOX_SIZE};
    height: ${CHECKBOX_SIZE};
    cursor: pointer;
    accent-color: ${theme.color.background.activeCell};
  `}
`;
