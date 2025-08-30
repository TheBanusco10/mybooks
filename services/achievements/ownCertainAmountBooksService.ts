export default class OwnCertainAmountBooksService {
  static async execute(supabase: any, booksCount: number) {
    const { count } = await supabase
      .from("books")
      .select("*", { count: "exact", head: true });

    return (count ?? 0) >= booksCount;
  }
}
