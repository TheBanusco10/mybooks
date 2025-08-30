export default defineNuxtPlugin({
  name: "get-public-user",
  async setup() {
    const { getUser } = usePublicUser();

    await getUser();
  },
});
