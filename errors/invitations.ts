export const ERROR_NAME = "InvitationsError";

export class InvitationsError extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string, code?: string) {
    super(message);
    this.name = ERROR_NAME;
    this.code = code;
    this.originalError = originalError;
  }
}

export const INVITE_USER_TO_READING_CLUB_ERROR_MESSAGE =
  "Ha ocurrido un error al invitar al usuario al club de lectura.";
