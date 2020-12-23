import { Event, EventManager } from './EventManager';

export enum ToastTypes {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export interface ToastOptions {
  type?: ToastTypes;
  isHtml?: boolean;
  delay?: number;
}

export type ToastOptionsWithId = ToastOptions & { id: string };

function generateId() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return Array.from({ length: 6 })
    .map(() => s4())
    .join('-');
}

function mergeOptions(type: ToastTypes, options: ToastOptions): ToastOptionsWithId {
  return {
    ...options,
    id: generateId(),
    type,
  };
}

function dispatchToast(message: string, options: ToastOptionsWithId) {
  EventManager.emit(Event.Show, message, options);
  return options.id;
}

export const toast = (message: string, options: ToastOptions = {}) =>
  dispatchToast(message, mergeOptions(options.type ?? ToastTypes.Info, options));

toast.success = (message: string, options: ToastOptions = {}) =>
  dispatchToast(message, mergeOptions(ToastTypes.Success, options));

toast.error = (message: string, options: ToastOptions = {}) =>
  dispatchToast(message, mergeOptions(ToastTypes.Error, options));

toast.warning = (message: string, options: ToastOptions = {}) =>
  dispatchToast(message, mergeOptions(ToastTypes.Warning, options));

toast.info = (message: string, options: ToastOptions = {}) =>
  dispatchToast(message, mergeOptions(ToastTypes.Info, options));
