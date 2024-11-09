import {
  InvitationsError,
  INVITE_USER_TO_READING_CLUB_ERROR_MESSAGE,
} from "~/errors/invitations";
import {
  IS_ALREADY_MEMBER_ERROR_MESSAGE,
  ReadingClubsError,
} from "~/errors/readingClubs";
import { USER_NOT_FOUND_ERROR_MESSAGE, UsersError } from "~/errors/users";

export const useInvitationsStore = defineStore("invitations", () => {
  const supabase = useSupabaseClient();

  // TODO: Store invitation and send it as notification
  const inviteUser = async (user: string, clubId: number) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .or(`username.eq.${user},email.eq.${user}`)
      .eq("is_private", false)
      .maybeSingle();

    if (error)
      throw new InvitationsError(
        INVITE_USER_TO_READING_CLUB_ERROR_MESSAGE,
        error.message
      );

    if (!data) throw new UsersError(USER_NOT_FOUND_ERROR_MESSAGE);

    const { isUserInReadingClub, addUserToReadingClub } =
      useReadingClubsStore();

    const userId = data.id;

    const isUserMember = await isUserInReadingClub(userId, clubId);

    if (isUserMember)
      throw new ReadingClubsError(IS_ALREADY_MEMBER_ERROR_MESSAGE);

    await addUserToReadingClub(userId, clubId);
  };

  return {
    inviteUser,
  };
});
