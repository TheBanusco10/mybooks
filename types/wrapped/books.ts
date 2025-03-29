import type { Row } from "~/interfaces/database";

type BookRead = Pick<Row<"books">, "id" | "title" | "image_url">;
type BestBook = Pick<Row<"books">, "id" | "title" | "score" | "image_url">;

export type { BookRead, BestBook };
