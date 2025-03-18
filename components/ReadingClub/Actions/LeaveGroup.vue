<script setup lang="ts">
import type { ReadingClubsError } from "~/errors/readingClubs";
import type { ModalRef } from "~/types/modals";

interface Props {
  clubId: number;
}

const props = defineProps<Props>();

const { removeUserFromReadingClub } = useReadingClubsStore();

const leaveGroupModalRef = ref<ModalRef>();
const isFetching = ref(false);

const handleLeaveGroup = async () => {
  try {
    isFetching.value = true;

    const user = useSupabaseUser();

    await removeUserFromReadingClub(user.value?.id || "", props.clubId);

    leaveGroupModalRef.value?.dialogElement.close();

    await navigateTo("/reading-clubs");
  } catch (err: any) {
    const error: ReadingClubsError = err;

    console.error(error.message);
  } finally {
    isFetching.value = false;
  }
};
</script>

<template>
  <section>
    <button
      class="btn btn-circle btn-outline btn-sm btn-error"
      @click="leaveGroupModalRef?.dialogElement.showModal()"
    >
      <Icon name="mdi:door-open" size="1.2rem" />
    </button>
    <GothamModal id="leave_group" ref="leaveGroupModalRef">
      <template v-slot:title>
        {{ $t("app.leaveReadingClub") }}
      </template>
      <template v-slot:content>
        {{ $t("app.leaveReadingClubHelp") }}
      </template>
      <template v-slot:action>
        <button
          class="btn btn-error"
          @click="handleLeaveGroup"
          :disabled="isFetching"
        >
          {{ $t("forms.leave") }}
        </button>
      </template>
    </GothamModal>
  </section>
</template>
