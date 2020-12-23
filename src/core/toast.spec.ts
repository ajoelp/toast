import { EventManager, Event } from './EventManager';
import { toast, ToastTypes } from './toast';

describe('Toast', () => {
  it.each(Object.values(ToastTypes))('will dispatch a %s toast message', (type) => {
    const emitSpy = jest.spyOn(EventManager, 'emit').mockReset();
    const message = 'sample-message';
    toast(message, { type });
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(Event.Show, message, expect.objectContaining({ type }));
  });

  it.each(Object.values(ToastTypes))('will dispatch a %s toast message using helper methods', (type) => {
    const emitSpy = jest.spyOn(EventManager, 'emit').mockReset();
    const message = 'sample-message';
    toast[type](message);
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(Event.Show, message, expect.objectContaining({ type }));
  });
});
