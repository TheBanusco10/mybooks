export class ErrorBase extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string, code?: string) {
    super(message);
    this.code = code;
    this.originalError = originalError;
  }
}
