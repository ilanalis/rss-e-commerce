export const isObject = (data: unknown): data is Record<string, unknown> =>
  typeof data === 'object' && data !== null;
