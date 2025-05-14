import { format } from "@formkit/tempo";

export default () => {
  const formatNumber = (number: number) => {
    const locale = useLocale();
    return Intl.NumberFormat(locale.value).format(number);
  };

  const formatDate = (
    date: string | Date,
    type: "full" | "long" | "medium" | "short" | string = "short",
  ) => {
    return format(date, type);
  };

  const formatDateToInput = (date: string | Date) => {
    return formatDate(date, "YYYY-MM-DD");
  };

  return {
    formatNumber,
    formatDate,
    formatDateToInput,
  };
};
