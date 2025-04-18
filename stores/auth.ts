import type { UserCredentials } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const isUserLoggedIn = computed(() => !isEmpty(user.value));

  const signIn = async (userCredentials: UserCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(userCredentials);

    if (error) throw error;

    await navigateTo("/");
  };

  const signUp = async (userCredentials: UserCredentials) => {
    const { error } = await supabase.auth.signUp({
      email: userCredentials.email,
      password: userCredentials.password,
      options: {
        data: {
          image_url: userCredentials.imageUrl,
          username: userCredentials.username,
          is_private: true,
        },
      },
    });

    if (error) throw error;

    await navigateTo("/login/confirm");
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    await navigateTo("/login");
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    isUserLoggedIn,
  };
});
