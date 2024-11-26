import type { PublicUserInformation } from "~/types/users";

export default async () => {
  const publicUser = ref<PublicUserInformation | null>(null);

  const getUser = async () => {
    try {
      const user = await useUsersStore().getPublicUser();

      publicUser.value = user;
    } catch (error: any) {
      console.error(error);
    }
  };

  await getUser();

  return publicUser;
};
