import type { TopCategory } from "~/types/statistics";
import type { BestBook, BookRead } from "~/types/wrapped/books";

// TODO Create errors for wrapped store

export const useWrappedStore = defineStore("wrapped", () => {
  const isEnabled = true;
  const currentYear = new Date().getFullYear();
  const startOfYear = `${currentYear}-01-01`;
  const endOfWrapped = `${currentYear}-12-01`;
  const avgReadingSpeed = 1.5; // Average time in minutes per page

  const supabase = useSupabaseClient();

  const { STATUS_FINISHED } = useBookStatus();

  const wrappedSummary: any = ref({});

  const getBooksRead = async (): Promise<{
    booksRead: BookRead[];
    error?: Error;
  }> => {
    const { data: booksRead, error: booksReadError } = await supabase
      .from("books")
      .select("id, title, image_url")
      .gte("end_date", startOfYear)
      .lt("end_date", endOfWrapped);

    if (booksReadError) {
      const error = new Error("Failed to fetch books read");

      console.error(error.message);

      return {
        booksRead: [],
        error,
      };
    }

    wrappedSummary.value.booksRead = booksRead;

    return {
      booksRead,
      error: undefined,
    };
  };

  const getPagesRead = async () => {
    const { data: pagesRead, error: pagesReadError } = await supabase
      .from("books")
      .select("number_pages.sum()")
      .eq("status", STATUS_FINISHED)
      .gte("end_date", startOfYear)
      .lt("end_date", endOfWrapped)
      .single();

    if (pagesReadError) {
      console.error(pagesReadError.message);

      throw new Error("Failed to fetch books read");
    }

    const totalNumberPages = pagesRead.sum || 0;

    const totalReadingTimeHours =
      calculateTotalReadingTimeHours(totalNumberPages);

    wrappedSummary.value.totalNumberPages = totalNumberPages;
    wrappedSummary.value.totalReadingTimeHours = totalReadingTimeHours;

    return {
      totalNumberPages,
      totalReadTime: totalReadingTimeHours,
    };
  };

  const getBestBooks = async (): Promise<BestBook[]> => {
    const { data: bestBooks, error: bestBooksError } = await supabase
      .from("books")
      .select("id, title, score, image_url")
      .gte("end_date", startOfYear)
      .lt("end_date", endOfWrapped)
      .order("score", { ascending: false })
      .returns<BestBook[]>();

    if (bestBooksError) {
      console.error(bestBooksError.message);

      throw new Error("Failed to fetch best books");
    }

    wrappedSummary.value.bestBooks = bestBooks;

    return bestBooks;
  };

  const getMostReadCategories = async (): Promise<TopCategory[]> => {
    const { data: categories, error } = await supabase
      .rpc("get_wrapped_top_categories")
      .returns<TopCategory[]>();

    if (error) {
      console.error(error.message);

      throw new Error("Failed to fetch most read categories");
    }

    wrappedSummary.value.mostReadCategories = categories;

    return categories || [];
  };

  const getMostReadAuthors = async () => {
    const { data: authors, error: authorsError } = await supabase
      .from("books")
      .select("author, author.count()")
      .gte("end_date", startOfYear)
      .lt("end_date", endOfWrapped)
      .order("count", { ascending: false });

    wrappedSummary.value.mostReadAuthors = authors;
    return authors || [];
  };

  const calculateTotalReadingTimeHours = (totalNumberPages: number) => {
    const totalReadingTimeMinutes = totalNumberPages * avgReadingSpeed;

    return Number((totalReadingTimeMinutes / 60).toFixed(2));
  };

  return {
    isEnabled,
    wrappedSummary,
    getBooksRead,
    getPagesRead,
    getBestBooks,
    getMostReadCategories,
    getMostReadAuthors,
  };
});
