export const toCursorHash = string => Buffer.from(string).toString('base64')
export const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')
