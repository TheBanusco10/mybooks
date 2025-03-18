<script setup lang="ts">
import type { InvitationsError } from "~/errors/invitations";
import type { ReadingClubsError } from "~/errors/readingClubs";
import type { UsersError } from "~/errors/users";

interface Props {
  clubId: number;
}

interface FormValues {
  user: string;
}

const emits = defineEmits(["onUserInvited"]);

const props = defineProps<Props>();

const { inviteUser } = useInvitationsStore();

const handleInviteUser = async (values: FormValues) => {
  try {
    const { user } = values;
    await inviteUser(user, props.clubId);

    emits("onUserInvited");
  } catch (err: any) {
    const error: InvitationsError | UsersError | ReadingClubsError = err;

    console.error(error.message);
  }
};
</script>

<template>
  <div class="collapse collapse-arrow">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">
      {{ $t("app.inviteUser") }}
    </div>
    <div class="collapse-content">
      <GothamForm :submit-label="$t('app.invite')" @submit="handleInviteUser">
        <FormKit
          name="user"
          validation="required"
          :label="$t('app.usernameOrEmail')"
        />
      </GothamForm>
    </div>
  </div>
</template>
