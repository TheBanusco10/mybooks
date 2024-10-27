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
        error.message
      );

    const user = useSupabaseUser();

    const { error: updateProfilesTableError } = await supabase
      .from("profiles")
      .update(userInformation as never)
      .eq("id", user.value?.id!);

    if (updateProfilesTableError)
      throw new UsersError(
        UPDATE_USER_PERSONAL_INFORMATION_ERROR_MESSAGE,
        updateProfilesTableError.message
      );
  };

  return {
    updateUserInformation,
  };
});
