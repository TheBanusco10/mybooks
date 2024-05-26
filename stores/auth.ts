import type { UserCredentials } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient();

  const signIn = async (userCredentials: UserCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(userCredentials);

    if (error) throw error;

    await navigateTo("/");
  };

  return {
    signIn,
  };
});
