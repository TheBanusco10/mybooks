export default defineNuxtPlugin({
  name: "get-public-user",
  async setup() {
    const { getUser } = await usePublicUser();

    await getUser();
  },
});
