import {
  ProfilesError,
  GET_PROFILE_BY_USERNAME_ERROR_MESSAGE,
  SEARCH_PROFILE_ERROR_MESSAGE,
} from "~/errors/profiles";
import type {
  Profile,
  SearchProfileInformation,
  SearchProfilesResults,
} from "~/types/profiles";

export const useProfilesStore = defineStore("profiles", () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const searchProfiles = async (
    profileInformation: SearchProfileInformation
  ): Promise<SearchProfilesResults> => {
    const { username } = profileInformation;

    const { data, error } = await supabase
      .from("profiles")
      .select("username, image_url")
      .ilike("username", `%${username}%`)
      .neq("id", user.value?.id || ""); // Avoid getting current user

    if (error)
      throw new ProfilesError(SEARCH_PROFILE_ERROR_MESSAGE, error.message);

    if (!data) return [];

    return data;
  };

  const getProfileByUsername = async (
    username: string
  ): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error)
      throw new ProfilesError(
        GET_PROFILE_BY_USERNAME_ERROR_MESSAGE,
        error.message
      );

    return data;
  };

  return {
    searchProfiles,
    getProfileByUsername,
  };
});
