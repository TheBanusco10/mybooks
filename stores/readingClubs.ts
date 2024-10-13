import {
  ADD_USER_TO_READING_CLUB_ERROR_MESSAGE,
  CREATE_READING_CLUB_ERROR_MESSAGE,
  GET_READING_CLUB_ERROR_MESSAGE,
  GET_USERS_INFORMATION_IN_READING_CLUB_ERROR_MESSAGE,
  IS_USER_IN_READING_CLUB_ERROR_MESSAGE,
  ReadingClubsError,
} from "~/errors/readingClubs";
import type { Row } from "~/interfaces/database";
import type { Database } from "~/types/database.types";
import type { CreateReadingClub } from "~/types/readingClubs";

export const useReadingClubsStore = defineStore("readingClubs", () => {
  const supabase = useSupabaseClient<Database>();

  const createReadingClub = async (
    values: CreateReadingClub,
  ): Promise<number> => {
    const { data, error } = await supabase
      .from("reading_clubs")
      .insert(values)
      .select("id")
      .single();

    if (error)
      throw new ReadingClubsError(
        CREATE_READING_CLUB_ERROR_MESSAGE,
        error.message,
      );

    return data.id || -1;
  };

  const getReadingClubInformation = async (
    id: number,
  ): Promise<Row<"reading_clubs">> => {
    const { data, error } = await supabase
      .from("reading_clubs")
      .select()
      .eq("id", id)
      .single();

    if (error)
      throw new ReadingClubsError(
        GET_READING_CLUB_ERROR_MESSAGE,
        error.message,
      );

    return data;
  };

  const getMessages = async (
    clubId: number,
  ): Promise<Row<"reading_clubs_messages">[]> => {
    const { data, error } = await supabase
      .from("reading_clubs_messages")
      .select("*")
      .eq("club_id", clubId) // Filtra por el ID del grupo
      .order("created_at", { ascending: true });

    if (error) throw error;

    return data || [];
  };

  /**
   * @param {boolean} isAfterCreated Set to true if the function is called immediately after a club is created. This manage the removal of the group if some error happens
   */
  const addUserToReadingClub = async (
    userId: string,
    clubId: number,
    isAfterCreated: boolean = false,
  ): Promise<void> => {
    if (!userId || !clubId) return;

    const { error } = await supabase
      .from("reading_clubs_members")
      .insert({ user_id: userId, club_id: clubId });

    if (error) {
      if (isAfterCreated) {
        await supabase.from("reading_clubs").delete().eq("id", clubId);
      }

      throw new ReadingClubsError(
        ADD_USER_TO_READING_CLUB_ERROR_MESSAGE,
        error.message,
      );
    }
  };

  const isUserInReadingClub = async (
    userId: string,
    clubId: number,
  ): Promise<boolean> => {
    if (!userId || !clubId) return false;

    const { data, error } = await supabase
      .from("reading_clubs_members")
      .select("*")
      .eq("user_id", userId)
      .eq("club_id", clubId);

    if (error)
      throw new ReadingClubsError(
        IS_USER_IN_READING_CLUB_ERROR_MESSAGE,
        error.message,
      );

    return data.length > 0;
  };

  const getReadingClubMembers = async (
    clubId: number,
  ): Promise<Row<"profiles">[]> => {
    const { data, error } = await supabase
      .from("reading_clubs_members")
      .select("...profiles(*)") // Trae el user_id y los datos completos del usuario
      .eq("club_id", clubId);

    if (error)
      throw new ReadingClubsError(
        GET_USERS_INFORMATION_IN_READING_CLUB_ERROR_MESSAGE,
        error.message,
      );

    return data || [];
  };

  const sendMessage = async (
    content: string,
    clubId: number,
  ): Promise<Row<"reading_clubs_messages">> => {
    const { data, error } = await supabase
      .from("reading_clubs_messages")
      .insert([{ content, club_id: clubId }])
      .select()
      .single();

    if (error) throw error;

    return data;
  };

  return {
    getReadingClubInformation,
    createReadingClub,
    addUserToReadingClub,
    isUserInReadingClub,
    getReadingClubMembers,
    getMessages,
    sendMessage,
  };
});
