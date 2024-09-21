export const ERROR_NAME = "UsersError";

export class UsersError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = ERROR_NAME;
    this.code = code;
  }
}

export const UPDATE_USER_PERSONAL_INFORMATION_ERROR_MESSAGE =
  "Ha ocurrido un error al actualizar los datos de tu perfil.";
export const EMPTY_USER_PERSONAL_INFORMATION_ERROR_MESSAGE =
  "Los datos de su perfil están vacíos.";
