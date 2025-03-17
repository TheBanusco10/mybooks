import type { Type } from "~/types/books";

export default () => {
  const { t } = useI18n();

  const types = computed<Type[]>(() => [
    { value: "paper", label: t("books.types.paper") },
    { value: "kindle", label: t("books.types.kindle") },
  ]);

  const getBookType = (typeValue: string): Type => {
    return (
      types.value.find((type) => type.value === typeValue) || types.value.at(0)!
    );
  };

  const isPaper = (typeValue: string): boolean => {
    return typeValue === "paper";
  };

  const getTypeIcon = (typeValue: string): string => {
    // Return mdi icon based on type using the function above
    return isPaper(typeValue)
      ? "mdi:book-open-blank-variant-outline"
      : "streamline:computer-hand-held-tablet-kindle-device-electronics-ipad-computer";
  };

  return {
    types,
    getBookType,
    isPaper,
    getTypeIcon,
  };
};
