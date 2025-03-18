<script setup lang="ts">
import type { ReadingClubsError } from "~/errors/readingClubs";
import type { ModalRef } from "~/types/modals";

interface Props {
  clubId: number;
}

const props = defineProps<Props>();

const { removeReadingClub } = useReadingClubsStore();

const removeGroupModalRef = ref<ModalRef>();
const isFetching = ref(false);

const handleRemoveGroup = async () => {
  try {
    isFetching.value = true;

    await removeReadingClub(props.clubId);

    removeGroupModalRef.value?.dialogElement.close();

    await navigateTo("/");
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
      @click="removeGroupModalRef?.dialogElement.showModal()"
    >
      <Icon name="mdi:trash-can-outline" size="1.2rem" />
    </button>
    <GothamModal id="leave_group" ref="removeGroupModalRef">
      <template v-slot:title>
        {{ $t("app.removeReadingClub") }}
      </template>
      <template v-slot:content>
        {{ $t("app.removeReadingClubHelp") }}
      </template>
      <template v-slot:action>
        <button
          class="btn btn-error"
          @click="handleRemoveGroup"
          :disabled="isFetching"
        >
          {{ $t("forms.remove") }}
        </button>
      </template>
    </GothamModal>
  </section>
</template>
