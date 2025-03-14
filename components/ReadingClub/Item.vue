<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  readingClub: Row<"reading_clubs">;
}

const props = defineProps<Props>();

const { getNumberOfMembers } = useReadingClubsStore();

const user = useSupabaseUser();

const { data: numberOfMembers } = await useAsyncData(
  `${props.readingClub.id}`,
  () => getNumberOfMembers(props.readingClub.id)
);
</script>

<template>
  <NuxtLink
    :to="`/reading-clubs/${readingClub.id}`"
    class="relative flex justify-between gap-2 items-center p-4 border-b border-base-content before:content before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[.2rem] before:bg-primary hover:before:w-full before:transition-all before:duration-300 hover:bg-base-300/30 hover:border-transparent transition duration-300"
  >
    <div>
      <p>
        {{ readingClub.name }}
      </p>
      <div class="text-xs text-base-content/60">
        <p v-if="numberOfMembers">{{ numberOfMembers }} miembro/s</p>
        <p v-else>Sin miembros</p>
        <p
          v-if="user?.id === readingClub.user_id"
          class="badge badge-outline badge-xs mt-2"
        >
          Admin
        </p>
      </div>
    </div>
    <div>
      <Icon name="ph:caret-right-bold" />
    </div>
  </NuxtLink>
</template>
