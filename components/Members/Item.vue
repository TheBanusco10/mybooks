<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  member: Row<"profiles">;
  showActions?: boolean;
  club: Row<"reading_clubs">;
}

const emits = defineEmits(["onUserRemoved"]);

withDefaults(defineProps<Props>(), {
  showActions: false,
});
</script>

<template>
  <article
    class="flex gap-2 items-center justify-between border-b border-gray-500 last:border-0 py-3"
  >
    <section class="flex gap-2 items-center">
      <GothamAvatar :image-url="member.image_url" :username="member.username" />
      <p>
        {{ member.username || member.email }}
      </p>
    </section>
    <section v-if="showActions">
      <ReadingClubActionsRemoveUser
        :user-id="member.id"
        :club-id="club.id"
        @on-user-removed="$emit('onUserRemoved')"
      />
    </section>
  </article>
</template>
