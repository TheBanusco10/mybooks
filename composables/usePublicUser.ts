import type { PublicUserInformation } from "~/types/users";

export default () => {
  const publicUser = useState<PublicUserInformation | null>(
    "publicUser",
    () => null
  );

  const getUser = async () => {
    try {
      const user = await useUsersStore().getPublicUser();

      publicUser.value = user;
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    publicUser,
    getUser,
  };
};
