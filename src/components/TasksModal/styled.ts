import styled, { css } from 'styled-components';

import { buttonBaseStyles } from '../commonStyles';

const MODAL_MAX_WIDTH = '400px';
const MODAL_Z_INDEX = 100;
const CONFIRM_Z_INDEX = 1000;
const MAX_WIDTH_CONFIRM = '300px';
const OVERLAY_COLOR = 'rgba(0,0,0,0.63)';
const CONFIRM_OVERLAY_COLOR = 'rgba(0,0,0,0.76)';

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const baseButtonReset = css`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${OVERLAY_COLOR};
  ${flexCenter};
  z-index: ${MODAL_Z_INDEX};
`;

export const Modal = styled.div`
  ${({ theme }) => css`
    background: ${theme.color.background.secondary};
    color: ${theme.color.text.primary};
    border-radius: ${theme.borderRadius.md};
    width: 80%;
    max-width: ${MODAL_MAX_WIDTH};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.shadow.medium};
    font-family: ${theme.fontFamily.primary};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.base};
  `}
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    ${baseButtonReset};
    font-size: ${theme.fontSize.h3};
    color: ${theme.color.text.secondary};

    &:hover {
      color: ${theme.color.text.ranged};
    }
  `}
`;

export const TaskList = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding: 0;
    margin: 0 0 ${theme.spacing.base};
    max-height: 200px;
    overflow-y: auto;
  `}
`;

export const TaskItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${theme.color.background.onCellHover};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const RemoveButton = styled.button`
  ${({ theme }) => css`
    ${baseButtonReset};
    color: ${theme.color.red.main};
    font-size: ${theme.fontSize.h5};

    &:hover {
      color: ${theme.color.red.dark};
    }
  `}
`;

export const EmptyText = styled.p`
  ${({ theme }) => css`
    color: ${theme.color.text.secondary};
    text-align: center;
    font-size: ${theme.fontSize.h5};
  `}
`;

export const NewTaskSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.sm};
  `}
`;

export const TaskInput = styled.input`
  ${({ theme }) => css`
    flex: 1;
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    border: ${theme.borderThickness.thin} solid ${theme.color.text.placeholder};
    color: ${theme.color.text.primary};
    background: ${theme.color.background.primary};

    &::placeholder {
      color: ${theme.color.text.placeholder};
    }

    &:focus {
      outline: none;
      border-color: ${theme.color.text.secondary};
    }
  `}
`;

export const AddButton = styled.button`
  ${buttonBaseStyles}
`;

export const ErrorMessage = styled.p<{ isVisible?: boolean }>`
  ${({ theme, isVisible }) => css`
    color: ${theme.color.red.main};
    text-align: center;
    font-size: ${theme.fontSize.h6};
    min-height: 1rem;
    visibility: ${isVisible ? 'visible' : 'hidden'};
  `}
`;

export const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${CONFIRM_OVERLAY_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${CONFIRM_Z_INDEX};
`;

export const ConfirmModal = styled.div`
  ${({ theme }) => css`
    background: ${theme.color.background.secondary};
    color: ${theme.color.text.primary};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadow.hard};
    min-width: ${MAX_WIDTH_CONFIRM};
    text-align: center;
  `}
`;

export const ConfirmActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.base};
  `}
`;

export const CancelButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.color.background.button};
    color: ${theme.color.text.primary};
    border: none;
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {
      background: ${theme.color.background.onCellHover};
    }
  `}
`;

export const ConfirmButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.color.red.main};
    color: ${theme.color.text.contrast};
    border: none;
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${theme.color.red.dark};
    }
  `}
`;
