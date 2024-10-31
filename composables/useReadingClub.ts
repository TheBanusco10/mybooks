export default () => {
  const getReadingClubIdFromUrl = (): number => {
    const route = useRoute();

    let id = route.params.id;

    if (isArray(id)) {
      id = id[0];
    }

    return parseInt(id);
  };

  return {
    getReadingClubIdFromUrl,
  };
};
