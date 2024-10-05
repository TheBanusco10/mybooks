export const ERROR_NAME = "ReadingClubsError";

export class ReadingClubsError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = ERROR_NAME;
    this.code = code;
  }
}

export const CREATE_READING_CLUB_ERROR_MESSAGE =
  "Ha ocurrido un error al crear el club de lectura.";
