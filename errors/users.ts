export const ERROR_NAME = "UsersError";

export class UsersError extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string, code?: string) {
    super(message);
    this.name = ERROR_NAME;
    this.code = code;
    this.originalError = originalError;
  }
}

export const UPDATE_USER_PERSONAL_INFORMATION_ERROR_MESSAGE =
  "Ha ocurrido un error al actualizar los datos de tu perfil.";
export const EMPTY_USER_PERSONAL_INFORMATION_ERROR_MESSAGE =
  "Los datos de su perfil están vacíos.";
export const USER_NOT_FOUND_ERROR_MESSAGE =
  "No hemos podido encontrar al usuario.";
