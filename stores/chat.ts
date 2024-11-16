import type { Row } from "~/interfaces/database";
import type { PublicUserInformation } from "~/types/users";

type MessageRow = Row<"reading_clubs_messages">;

interface MessageInformation {
  message_id: number;
  created_at: string | null;
  club_id: number | null;
  message: string;
  user: PublicUserInformation;
}

export type { MessageInformation };
