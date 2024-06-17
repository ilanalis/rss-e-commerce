export const isObject = (data: unknown): data is Record<string, unknown> =>
  typeof data === 'object' && data !== null;

export const isString = (data: unknown): data is string => typeof data === 'string';

export const isNumber = (data: unknown): data is number => typeof data === 'number';

export const isHTMLInputElement = (data: unknown): data is HTMLInputElement =>
  isObject(data) && data instanceof HTMLInputElement;
