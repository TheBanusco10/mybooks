export default () => {
  const STATUS_READING = "reading";
  const STATUS_FINISHED = "finished";
  const STATUS_PAUSED = "paused";

  const statuses = [
    { value: STATUS_READING, label: "Leyendo" },
    { value: STATUS_FINISHED, label: "Terminado" },
    { value: STATUS_PAUSED, label: "Pausado" },
  ];

  const getBookStatus = (statusValue: string) => {
    return (
      statuses.find((status) => status.value === statusValue) || statuses.at(0)
    );
  };

  const getStatusBackgroundColor = (statusValue: string) => {
    switch (statusValue) {
      case STATUS_READING:
        return "bg-primary";
      case STATUS_FINISHED:
        return "bg-success";
      case STATUS_PAUSED:
        return "bg-warning";
      default:
        return "bg-error";
    }
  };

  return {
    statuses,
    getBookStatus,
    getStatusBackgroundColor,
  };
};
