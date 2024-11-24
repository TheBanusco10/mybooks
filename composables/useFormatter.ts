import { format } from "@formkit/tempo";

export default () => {
  const formatNumber = (number: number) => {
    const locale = useLocale();
    return Intl.NumberFormat(locale.value).format(number);
  };

  const formatDate = (
    date: string,
    time: "full" | "long" | "medium" | "short" = "short"
  ) => {
    return format(date, {
      time,
    });
  };

  return {
    formatNumber,
    formatDate,
  };
};
