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
export const GET_READING_CLUB_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener la información del club de lectura.";
export const ADD_USER_TO_READING_CLUB_ERROR_MESSAGE =
  "Ha ocurrido un error al añadir al usuario al club de lectura.";
export const IS_USER_IN_READING_CLUB_ERROR_MESSAGE =
  "Ha ocurrido un error al comprobar si el usuario pertenece al club de lectura.";
export const GET_USERS_INFORMATION_IN_READING_CLUB_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener la información de los usuarios pertenecientes al club de lectura.";
