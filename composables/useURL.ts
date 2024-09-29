export default () => {
  const getUrl = (): URL => {
    return new URL(window.location.href);
  };

  const clearQueryParams = (): void => {
    window.history.pushState({}, document.title, window.location.pathname);
  };

  const setUrl = (url: string | URL | null | undefined): void => {
    history.pushState(null, "", url);
  };

  return {
    clearQueryParams,
    getUrl,
    setUrl,
  };
};
