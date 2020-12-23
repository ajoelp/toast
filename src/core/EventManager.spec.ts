import { EventManager, Event } from './EventManager';

describe('EventManager', () => {
  beforeEach(() => {
    EventManager.clean();
  });

  it('will add a callback to the event list', () => {
    const callback = jest.fn();
    EventManager.on(Event.Show, callback);
    const [firstEvent] = EventManager.list.get(Event.Show);
    expect(firstEvent).toBe(callback);
  });

  it('will remove a single callback from the list', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();

    EventManager.on(Event.Show, firstCallback).on(Event.Show, secondCallback).off(Event.Show, firstCallback);

    expect(EventManager.list.get(Event.Show)).toContain(secondCallback);
    expect(EventManager.list.get(Event.Show)).not.toContain(firstCallback);
  });

  it('will remove a all callbacks from the list', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    EventManager.on(Event.Show, firstCallback).on(Event.Show, secondCallback);

    EventManager.off(Event.Show);
    expect(EventManager.list.get(Event.Show)).toBeUndefined();
  });

  it('will emit an event', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const args = { test: true };

    EventManager.on(Event.Show, callback).emit(Event.Show, args);

    jest.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(args);
  });
});
