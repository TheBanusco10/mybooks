export default () => {
  const types = [
    { value: "paper", label: "Papel" },
    { value: "kindle", label: "Kindle" },
  ];

  const getBookType = (typeValue: string) => {
    return types.find((type) => type.value === typeValue) || types.at(0);
  };

  const isPaper = (typeValue: string) => {
    return typeValue === "paper";
  };

  const getTypeIcon = (typeValue: string) => {
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
