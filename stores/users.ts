import {
  EMPTY_USER_PERSONAL_INFORMATION_ERROR_MESSAGE,
  UPDATE_USER_PERSONAL_INFORMATION_ERROR_MESSAGE,
  UsersError,
} from "~/errors/users";
import type { UserInformation } from "~/types/users";

export const useUsersStore = defineStore("users", () => {
  const supabase = useSupabaseClient();

  const updateUserInformation = async (userInformation: UserInformation) => {
    if (isEmpty(userInformation))
      throw new UsersError(EMPTY_USER_PERSONAL_INFORMATION_ERROR_MESSAGE);

    const { error } = await supabase.auth.updateUser({
      data: userInformation,
    });

    if (error)
      throw new UsersError(
        UPDATE_USER_PERSONAL_INFORMATION_ERROR_MESSAGE,
        error.message,
      );
  };

  return {
    updateUserInformation,
  };
});
