import {
  EMPTY_USER_PERSONAL_INFORMATION_ERROR_MESSAGE,
  UPDATE_USER_PERSONAL_INFORMATION_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  UsersError,
} from "~/errors/users";
import type { PublicUserInformation, UserInformation } from "~/types/users";

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

  const getPublicUser = async (): Promise<PublicUserInformation | null> => {
    const user = useSupabaseUser();

    if (!user.value) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.value?.id)
      .single();

    if (error)
      throw new UsersError(USER_NOT_FOUND_ERROR_MESSAGE, error.message);

    return data;
  };

  return {
    updateUserInformation,
    getPublicUser,
  };
});
