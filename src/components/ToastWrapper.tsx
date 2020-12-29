import { Event, EventManager } from '../core';
import React from 'react';
import { useToastMessages } from '../hooks/useToastMessages';
import { ToastContainer, Position } from './layoutContainers';
import { ToastMessage, ToastMessageProps } from './ToastMessage';

export type ToastWrapperProps = {
  defaultDelay?: number | null;
  position?: Position;
  toastContainer?: (props: ToastMessageProps) => JSX.Element;
  className?: string;
};

export function ToastWrapper(props: ToastWrapperProps) {
  const {
    defaultDelay = 2500,
    position = 'top-right',
    toastContainer: ToastMessageComponent = ToastMessage,
    className,
  } = props;
  const messages = useToastMessages({ defaultDelay });

  if (messages.length <= 0) return null;

  const closeMessage = (id: string) => () => {
    EventManager.emit(Event.Clear, { id });
  };

  return (
    <ToastContainer {...{ className, position }}>
      {messages.map((message) => (
        <ToastMessageComponent key={message.options.id} close={closeMessage(message.options.id)} {...message} />
      ))}
    </ToastContainer>
  );
}
