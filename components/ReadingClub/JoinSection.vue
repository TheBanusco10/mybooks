<script setup lang="ts">
import { ReadingClubsError } from "~/errors/readingClubs";

interface Props {
  userId: string;
  clubId: number;
}

const emits = defineEmits(["onUserAdded"]);

const props = defineProps<Props>();

const { addUserToReadingClub } = useReadingClubsStore();

const isFetching = ref(false);

const handleAddUserToReadingClub = async () => {
  try {
    isFetching.value = true;

    await addUserToReadingClub(props.userId, props.clubId);

    emits("onUserAdded");
  } catch (err: any) {
    const error: ReadingClubsError = err;

    console.error(error.message);
  } finally {
    isFetching.value = false;
  }
};
</script>

<template>
  <div
    class="w-full flex justify-evenly items-center absolute bottom-0 p-4 bg-gray-100"
  >
    <p>
      {{ $t("app.joinReadingClubHelp") }}
    </p>
    <button
      class="btn btn-primary"
      @click="handleAddUserToReadingClub"
      :disabled="isFetching"
    >
      {{ $t("forms.join") }}
    </button>
  </div>
</template>
