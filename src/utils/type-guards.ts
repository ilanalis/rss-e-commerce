export const isObject = (data: unknown): data is Record<string, unknown> =>
  typeof data === 'object' && data !== null;

export const isHTMLInputElement = (data: unknown): data is HTMLInputElement =>
  isObject(data) && data instanceof HTMLInputElement;
