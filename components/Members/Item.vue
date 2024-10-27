<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  member: Row<"profiles">;
}

const props = defineProps<Props>();

console.log(props.member);
</script>

<template>
  <article
    class="flex gap-2 items-center border-b border-gray-500 last:border-0 py-3"
  >
    <section>
      <GothamAvatar :image-url="member.image_url" :username="member.username" />
    </section>
    <section>
      <p>
        {{ member.username || member.email }}
      </p>
    </section>
  </article>
</template>
