import type { Row } from "~/interfaces/database";

interface Type {
  value: string;
  label: string;
}

interface BooksResult {
  results: Row<"books">[];
  total: number;
}

interface OpenLibraryBook {
  author: string;
  cover: string | null;
  description: string;
  key: string;
  title: string;
}

type Status = Type;

export type { Type, Status, BooksResult, OpenLibraryBook };
