import { Event, EventManager } from '../core';
import React from 'react';
import { useToastMessages } from '../hooks/useToastMessages';
import { ToastMessage, ToastMessageProps } from './ToastMessage';

export type ToastWrapperProps = {
  defaultDelay?: number | null;
  toastContainer?: (props: ToastMessageProps) => JSX.Element;
  className?: string;
};

export function ToastWrapper(props: ToastWrapperProps) {
  const { defaultDelay = 2500, toastContainer: ToastMessageComponent = ToastMessage, className } = props;
  const messages = useToastMessages({ defaultDelay });

  if (messages.length <= 0) return null;

  const closeMessage = (id: string) => () => {
    EventManager.emit(Event.Clear, { id });
  };

  return (
    <div {...{ className }}>
      {messages.map((message) => (
        <ToastMessageComponent key={message.options.id} close={closeMessage(message.options.id)} {...message} />
      ))}
    </div>
  );
}
