<script setup lang="ts">
import type { SearchProfileResult } from "~/types/profiles";

interface Props {
  profile: SearchProfileResult;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="`/profile/${profile.username}`"
    class="flex flex-col gap-2 justify-center items-center group border-b-2 border-transparent hover:border-primary transition-all"
  >
    <GothamAvatar :image-url="profile.image_url" :username="profile.username" size="lg" class="border-2 rounded-full border-transparent group-hover:border-primary transition-all" />
    <p>{{ profile.username }}</p>
  </NuxtLink>
</template>
