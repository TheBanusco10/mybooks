export const PROFILES_ERROR_ID = "ProfilesError";

export class ProfilesError extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string, code?: string) {
    super(message);
    this.name = PROFILES_ERROR_ID;
    this.code = code;
    this.originalError = originalError;
  }
}

export const SEARCH_PROFILE_ERROR_MESSAGE =
  "Ha ocurrido un error al buscar perfiles.";
export const GET_PROFILE_BY_USERNAME_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener el perfil.";
