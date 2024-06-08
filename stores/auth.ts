import type { UserCredentials } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const isUserLoggedIn = computed(() => !isUndefined(user.value));

  const signIn = async (userCredentials: UserCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(userCredentials);

    if (error) throw error;

    await navigateTo("/");
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    await navigateTo("/login");
  };

  return {
    signIn,
    signOut,
    isUserLoggedIn,
  };
});
