export const ERROR_NAME = "SettingsError";

export class SettingsError extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string, code?: string) {
    super(message);
    this.name = ERROR_NAME;
    this.code = code;
    this.originalError = originalError;
  }
}

export const UPDATE_SETTINGS_ERROR_MESSAGE =
  "Ha ocurrido un error al actualiar tus preferencias.";
