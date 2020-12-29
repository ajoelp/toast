import { EventManager, Event } from '../core/EventManager';
import { ToastOptionsWithId } from '../core/toast';
import { useCallback, useEffect, useState } from 'react';

export type ToastMessage = {
  message: string;
  options: ToastOptionsWithId;
  active: Boolean;
};

export type ToastMessageOptions = {
  defaultDelay: number | null;
  animationDelay?: number;
};

export function useToastMessages(args: ToastMessageOptions) {
  const { defaultDelay, animationDelay = 500 } = args;

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const updateMessage = useCallback((id: string, data: Partial<ToastMessage>) => {
    setMessages((current) =>
      current.map((message) => {
        if (message.options.id === id) {
          return { ...message, ...data };
        }
        return message;
      }),
    );
  }, []);

  const addMessage = useCallback(
    (message: string, options: ToastOptionsWithId) => {
      setMessages((current) => [...current, { message, options, active: false }]);
      setTimeout(() => {
        updateMessage(options.id, { active: true });
      }, animationDelay);
      if (defaultDelay != null) {
        setTimeout(() => {
          EventManager.emit(Event.Clear, { id: options.id });
        }, defaultDelay);
      }
    },
    [animationDelay, defaultDelay, updateMessage],
  );

  const removeMessage = useCallback(
    ({ id }: { id: string }) => {
      updateMessage(id, { active: false });
      setTimeout(() => {
        setMessages((current) => current.filter((value) => value.options.id !== id));
      }, animationDelay);
    },
    [animationDelay, updateMessage],
  );

  useEffect(() => {
    EventManager.on(Event.Show, addMessage);
    EventManager.on(Event.Clear, removeMessage);
    return () => {
      EventManager.off(Event.Show, addMessage);
      EventManager.off(Event.Clear, removeMessage);
    };
  }, [addMessage, defaultDelay, removeMessage]);

  return messages;
}
