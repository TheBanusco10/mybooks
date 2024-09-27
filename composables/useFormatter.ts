export default () => {
  const formatNumber = (number: number) => {
    const locale = useLocale();
    return Intl.NumberFormat(locale.value).format(number);
  };

  return {
    formatNumber,
  };
};
