export class InvalidJsonPatternError extends Error {
  constructor(line: string) {
    super(`Log: '${line}' has invalid format`);

    Error.captureStackTrace(this, InvalidJsonPatternError);
  }
}
