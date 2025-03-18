import {
  GET_HIGH_RATED_BOOKS_ERROR_MESSAGE,
  GET_TOP_CATEGORY_BOOKS_ERROR_MESSAGE,
  GET_TOTAL_NUMBER_BOOKS_ERROR_MESSAGE,
  GET_TOTAL_READ_PAGES_ERROR_MESSAGE,
  StatisticsError,
} from "~/errors/statistics";
import type { Row } from "~/interfaces/database";
import type { Database } from "~/types/database.types";
import type { TopCategory } from "~/types/statistics";

export const useStatisticsStore = defineStore("statistics", () => {
  const supabase = useSupabaseClient<Database>();

  const getTotalBooksNumber = async (): Promise<number> => {
    const { count, error } = await supabase
      .from("books")
      .select("*", { head: true, count: "exact" });

    if (error)
      throw new StatisticsError(
        GET_TOTAL_NUMBER_BOOKS_ERROR_MESSAGE,
        error.message
      );

    return count || 0;
  };

  const getHighRatedBooks = async (
    limit: number = 5
  ): Promise<Row<"books">[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("score", { ascending: false })
      .limit(limit);

    if (error)
      throw new StatisticsError(
        GET_HIGH_RATED_BOOKS_ERROR_MESSAGE,
        error.message
      );

    return data;
  };

  const getTopCategories = async (
    limit: number = 5
  ): Promise<TopCategory[]> => {
    const { data, error } = await supabase
      .rpc("get_top_categories", {
        limit_num: limit,
      })
      .returns<TopCategory[]>();

    if (error)
      throw new StatisticsError(
        GET_TOP_CATEGORY_BOOKS_ERROR_MESSAGE,
        error.message
      );

    return data;
  };

  const getTotalReadPages = async (): Promise<{ sum: number }> => {
    const { STATUS_FINISHED } = useBookStatus();

    const { data, error } = await supabase
      .from("books")
      .select("number_pages.sum()")
      .eq("status", STATUS_FINISHED)
      .single();

    if (error)
      throw new StatisticsError(
        GET_TOTAL_READ_PAGES_ERROR_MESSAGE,
        error.message
      );

    return data;
  };

  return {
    getTotalBooksNumber,
    getHighRatedBooks,
    getTopCategories,
    getTotalReadPages,
  };
});
