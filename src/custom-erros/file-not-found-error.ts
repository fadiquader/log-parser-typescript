export class FileNotFoundError extends Error {
  constructor(filename: string) {
    super(`File ${filename} not found`);

    Error.captureStackTrace(this, FileNotFoundError);
  }
}
