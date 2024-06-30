import type { Row } from "~/interfaces/database";

interface Type {
  value: string;
  label: string;
}

interface BooksResult {
  results: Row<"books">[];
  total: number;
}

type Status = Type;

export type { Type, Status, BooksResult };
