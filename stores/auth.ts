import ApplyUserSettingsService from "~/services/settings/ApplyUserSettingsService";
import type { UserCredentials } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const isUserLoggedIn = computed(() => !isEmpty(user.value));

  const signIn = async (userCredentials: UserCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(userCredentials);

    if (error) throw error;

    const { getUser } = usePublicUser();

    await getUser();

    await applyUserSettings();

    await navigateTo("/");
  };

  const signUp = async (userCredentials: UserCredentials) => {
    const {
      email,
      password,
      imageUrl = "",
      username,
      locale,
      theme,
    } = userCredentials;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          image_url: imageUrl,
          username,
          is_private: true,
          settings: { locale, theme },
        },
      },
    });

    if (error) throw error;

    await navigateTo("/login/confirm");
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    const { publicUser } = usePublicUser();

    publicUser.value = null;

    await navigateTo("/login");
  };

  const applyUserSettings = async () => {
    const { $i18n } = useNuxtApp();

    const theme = useTheme($i18n.t);
    const settings = await useSettings();

    await ApplyUserSettingsService.execute($i18n, settings, theme);
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    isUserLoggedIn,
  };
});
