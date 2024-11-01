import {
  ADD_USER_TO_READING_CLUB_ERROR_MESSAGE,
  CREATE_READING_CLUB_ERROR_MESSAGE,
  GET_NUMBER_OF_MEMBERS_ERROR_MESSAGE,
  GET_PUBLIC_READING_CLUBS_ERROR_MESSAGE,
  GET_READING_CLUB_ERROR_MESSAGE,
  GET_USERS_INFORMATION_IN_READING_CLUB_ERROR_MESSAGE,
  IS_USER_IN_READING_CLUB_ERROR_MESSAGE,
  ReadingClubsError,
  REMOVE_READING_CLUB_ERROR_MESSAGE,
  REMOVE_USER_FROM_READING_CLUB_ERROR_MESSAGE,
  UPDATE_READING_CLUB_ERROR_MESSAGE,
} from "~/errors/readingClubs";
import type { Row } from "~/interfaces/database";
import type { Database } from "~/types/database.types";
import type { ReadingClubInformation } from "~/types/readingClubs";

export const useReadingClubsStore = defineStore("readingClubs", () => {
  const supabase = useSupabaseClient<Database>();

  const createReadingClub = async (
    values: ReadingClubInformation
  ): Promise<number> => {
    const { data, error } = await supabase
      .from("reading_clubs")
      .insert(values)
      .select("id")
      .single();

    if (error)
      throw new ReadingClubsError(
        CREATE_READING_CLUB_ERROR_MESSAGE,
        error.message
      );

    return data.id || -1;
  };

  const updateReadingClub = async (
    id: number,
    values: ReadingClubInformation
  ): Promise<void> => {
    const { error } = await supabase
      .from("reading_clubs")
      .update(values)
      .eq("id", id);

    if (error)
      throw new ReadingClubsError(
        UPDATE_READING_CLUB_ERROR_MESSAGE,
        error.message
      );
  };

  const getReadingClubInformation = async (
    id: number
  ): Promise<Row<"reading_clubs">> => {
    const { data, error } = await supabase
      .from("reading_clubs")
      .select()
      .eq("id", id)
      .single();

    if (error)
      throw new ReadingClubsError(
        GET_READING_CLUB_ERROR_MESSAGE,
        error.message
      );

    return data;
  };

  const getMessages = async (
    clubId: number
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
    isAfterCreated: boolean = false
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
        error.message
      );
    }
  };

  const isUserInReadingClub = async (
    userId: string,
    clubId: number
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
        error.message
      );

    return data.length > 0;
  };

  const getReadingClubMembers = async (
    clubId: number
  ): Promise<Row<"profiles">[]> => {
    const { data, error } = await supabase
      .from("reading_clubs_members")
      .select("...profiles(*)") // Trae el user_id y los datos completos del usuario
      .eq("club_id", clubId);

    if (error)
      throw new ReadingClubsError(
        GET_USERS_INFORMATION_IN_READING_CLUB_ERROR_MESSAGE,
        error.message
      );

    return data || [];
  };

  const sendMessage = async (
    content: string,
    clubId: number
  ): Promise<Row<"reading_clubs_messages">> => {
    const { data, error } = await supabase
      .from("reading_clubs_messages")
      .insert([{ content, club_id: clubId }])
      .select()
      .single();

    if (error) throw error;

    return data;
  };

  const getPublicReadingClubs = async (
    from: number,
    to: number
  ): Promise<{
    results: Row<"reading_clubs">[];
    total: number;
  }> => {
    const { data, error, count } = await supabase
      .from("reading_clubs")
      .select("*", { count: "exact" })
      .eq("is_private", false)
      .range(from, to);

    if (error)
      throw new ReadingClubsError(
        GET_PUBLIC_READING_CLUBS_ERROR_MESSAGE,
        error.message
      );

    return {
      results: data,
      total: count || 0,
    };
  };

  const getNumberOfMembers = async (clubId: number): Promise<number> => {
    const { count, error } = await supabase
      .from("reading_clubs_members")
      .select("*", { count: "exact", head: true })
      .eq("club_id", clubId);

    if (error)
      throw new ReadingClubsError(
        GET_NUMBER_OF_MEMBERS_ERROR_MESSAGE,
        error.message
      );

    return count || 0;
  };

  const removeUserFromReadingClub = async (
    userId: string,
    clubId: number
  ): Promise<void> => {
    if (!userId || !clubId) return;

    const { error } = await supabase
      .from("reading_clubs_members")
      .delete()
      .eq("user_id", userId)
      .eq("club_id", clubId);

    if (error)
      throw new ReadingClubsError(
        REMOVE_USER_FROM_READING_CLUB_ERROR_MESSAGE,
        error.message
      );
  };

  const isUserOwner = async (
    userId: string,
    clubId: number
  ): Promise<boolean> => {
    if (!userId || !clubId) return false;

    const { data, error } = await supabase
      .from("reading_clubs")
      .select("*")
      .eq("user_id", userId)
      .eq("id", clubId);

    if (error)
      throw new ReadingClubsError(
        GET_READING_CLUB_ERROR_MESSAGE,
        error.message
      );

    return data.length > 0;
  };

  const removeReadingClub = async (clubId: number): Promise<void> => {
    const { error } = await supabase
      .from("reading_clubs")
      .delete()
      .eq("id", clubId);

    if (error)
      throw new ReadingClubsError(
        REMOVE_READING_CLUB_ERROR_MESSAGE,
        error.message
      );
  };

  return {
    getReadingClubInformation,
    getPublicReadingClubs,
    getNumberOfMembers,
    createReadingClub,
    addUserToReadingClub,
    isUserInReadingClub,
    getReadingClubMembers,
    getMessages,
    sendMessage,
    removeUserFromReadingClub,
    updateReadingClub,
    isUserOwner,
    removeReadingClub,
  };
});
