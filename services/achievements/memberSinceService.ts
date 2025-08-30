import { addYear, format, isAfter, isEqual } from "@formkit/tempo";

export default class MemberSinceService {
  static async execute(supabase: any, years: number) {
    const user = useSupabaseUser();

    if (!user.value) return false;

    const { data, error } = await supabase
      .from("profiles")
      .select("created_at")
      .eq("id", user.value.id)
      .single();

    if (error) throw error;

    const { created_at } = data;

    if (years === 0) return true;

    const createdAtFormatted = format(created_at, "YYYY-MM-DD");
    const todayFormatted = format(new Date(), "YYYY-MM-DD");

    const pastYearsFormatted = addYear(createdAtFormatted, years);

    return (
      isAfter(todayFormatted, pastYearsFormatted) ||
      isEqual(todayFormatted, pastYearsFormatted)
    );
  }
}
