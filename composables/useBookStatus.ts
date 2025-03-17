import type { Status, TypeSingle } from "~/types/books";

export default () => {
  const { t } = useI18n();

  const STATUS_READING: TypeSingle = "reading";
  const STATUS_FINISHED: TypeSingle = "finished";
  const STATUS_PAUSED: TypeSingle = "paused";

  const statuses = computed<Status[]>(() => [
    { value: STATUS_READING, label: t("books.statuses.reading") },
    { value: STATUS_FINISHED, label: t("books.statuses.finished") },
    { value: STATUS_PAUSED, label: t("books.statuses.paused") },
  ]);

  const getBookStatus = (statusValue: string): Status => {
    return (
      statuses.value.find((status) => status.value === statusValue) ||
      statuses.value.at(0)!
    );
  };

  const getStatusBackgroundColor = (statusValue: string) => {
    switch (statusValue) {
      case STATUS_READING:
        return "bg-info";
      case STATUS_FINISHED:
        return "bg-success";
      case STATUS_PAUSED:
        return "bg-warning";
      default:
        return "bg-info";
    }
  };

  return {
    statuses,
    getBookStatus,
    getStatusBackgroundColor,
    STATUS_PAUSED,
    STATUS_READING,
    STATUS_FINISHED,
  };
};
