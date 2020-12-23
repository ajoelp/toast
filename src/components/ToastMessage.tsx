import React from 'react';
import { ToastOptionsWithId } from '../core';
import { ToastMessageWrapper } from './layoutContainers';

export interface ToastMessageProps {
  close(): void;
  active: Boolean;
  message: string;
  options: ToastOptionsWithId;
}

export function ToastMessage(props: ToastMessageProps) {
  const { close, active, message, options } = props;
  return (
    <ToastMessageWrapper active={active} type={options.type}>
      <p>{message}</p>
      <button onClick={close}>x</button>
    </ToastMessageWrapper>
  );
}
