import { clearConfigCache } from 'prettier';

export enum Event {
  Show = 'show',
  Clear = 'clear',
}

type Callback = (...args: any[]) => void;

class EventManagerService {
  list = new Map();

  on(event: Event, callback: Callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }
    this.list.get(event)?.push(callback);
    return this;
  }

  off(event: Event, callback?: Callback) {
    if (callback) {
      const filteredList = this.list.get(event)?.filter((cb: Callback) => cb !== callback) ?? [];
      this.list.set(event, filteredList);
      return this;
    }
    this.list.delete(event);
    return this;
  }

  emit(event: Event, ...args: any[]) {
    if (!this.list.has(event)) return;
    const callbacks = this.list.get(event) ?? [];
    callbacks.forEach((callback: Callback) => {
      setTimeout(() => {
        callback(...args);
      }, 0);
    });
  }

  clean() {
    this.list = new Map();
  }
}

export const EventManager = new EventManagerService();
