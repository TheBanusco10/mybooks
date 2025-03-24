import type { Row } from "~/interfaces/database";

type BookRead = Pick<Row<"books">, "id" | "title" | "image_url">;

export type { BookRead };
