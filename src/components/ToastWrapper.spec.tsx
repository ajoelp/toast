import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastWrapper } from './ToastWrapper';
import { toast, EventManager, Event } from '../core';

describe('ToastWrapper', () => {
  it('will show a toast message', async () => {
    const message = 'test-message';
    render(<ToastWrapper />);
    toast.success(message);
    expect(await screen.findByText(message)).toBeInTheDocument();
  });

  it('will emit close event after default time', async () => {
    const emitSpy = jest.spyOn(EventManager, 'emit');
    jest.useFakeTimers();
    const time = 200;
    const message = 'test-message';
    render(<ToastWrapper defaultDelay={time} />);
    const id = toast.success(message);
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(emitSpy).not.toHaveBeenCalledWith(Event.Clear, { id });
    jest.advanceTimersByTime(time);
    expect(emitSpy).toHaveBeenCalledWith(Event.Clear, { id });
  });

  it('will remove a toast message after delay', async () => {
    jest.useFakeTimers();
    const time = 1000;
    const message = 'test-message';
    render(<ToastWrapper defaultDelay={time} />);
    const id = toast.success(message);
    expect(await screen.findByTestId(`message-${id}`)).toBeInTheDocument();
    jest.advanceTimersByTime(time);
    expect(screen.queryByTestId(`message-${id}`)).not.toBeInTheDocument();
  });
});
