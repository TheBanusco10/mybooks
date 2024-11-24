<script setup lang="ts">
import type { ReadingClubsError } from "~/errors/readingClubs";
import type { ModalRef } from "~/types/modals";

interface Props {
  clubId: number;
  userId: string;
}

const props = defineProps<Props>();

const removeUserModalRef = ref<ModalRef>();
const isFetching = ref(false);
const user = useSupabaseUser();

const { removeUserFromReadingClub } = useReadingClubsStore();

const emits = defineEmits(["onUserRemoved"]);

const handleRemoveUser = async () => {
  try {
    isFetching.value = true;

    await removeUserFromReadingClub(props.userId, props.clubId);

    emits("onUserRemoved");
  } catch (err: any) {
    const error: ReadingClubsError = err;

    console.error(error.message);
  } finally {
    isFetching.value = false;
  }
};
</script>

<template>
  <section v-if="user?.id !== userId">
    <button
      class="btn btn-circle btn-outline btn-sm btn-error"
      @click="removeUserModalRef?.dialogElement.showModal()"
    >
      <Icon name="mdi:account-remove-outline" size="1.2rem" />
    </button>
    <GothamModal id="leave_group" ref="removeUserModalRef">
      <template v-slot:title>Expulsar usuario</template>
      <template v-slot:content>
        ¿Estás seguro de que deseas expulsar a este usuario del grupo?
      </template>
      <template v-slot:action>
        <button
          class="btn btn-error"
          @click="handleRemoveUser"
          :disabled="isFetching"
        >
          Expulsar
        </button>
      </template>
    </GothamModal>
  </section>
</template>
