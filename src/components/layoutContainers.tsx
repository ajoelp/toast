import { ToastTypes } from '../core';
import styled, { css } from 'styled-components';

export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type ToastContainerProps = {
  position: Position;
};

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  z-index: 100;
  ${({ position = 'top-right' }) => {
    const [vertical, horizontal] = position.split('-');
    return {
      [vertical]: 0,
      [horizontal]: 0,
    };
  }}
`;

interface ToastMessageWrapperProps {
  active: Boolean;
  type?: ToastTypes;
}

const Colors = {
  [ToastTypes.Success]: {
    background: '#ECFDF5',
    text: '#34D399',
  },
  [ToastTypes.Warning]: {
    background: '#FFFBEB',
    text: '#FBBF24',
  },
  [ToastTypes.Error]: {
    background: '#FEF2F2',
    text: '#F87171',
  },
  [ToastTypes.Info]: {
    background: '#EFF6FF',
    text: '#60A5FA',
  },
};

export const ToastMessageWrapper = styled.div<ToastMessageWrapperProps>`
  border-radius: 5px;
  margin: 10px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transform: translateX(100%);
  opacity: 0;
  padding: 1em;

  ${({ type = ToastTypes.Info }) => css`
    background-color: ${Colors[type].background};
    color: ${Colors[type].text};
  `};

  ${({ active }) =>
    active &&
    css`
      transform: translateX(0);
      opacity: 1;
    `};
`;
