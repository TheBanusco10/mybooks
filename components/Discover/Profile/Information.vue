<script setup lang="ts">
import type { Profile } from "~/types/profiles";

defineProps<Props>();

interface Props {
  profile: Profile;
}
</script>

<template>
  <section class="flex flex-col md:flex-row gap-4 items-center">
    <GothamAvatar
      :image-url="profile.image_url"
      :username="profile.username"
      size="xl"
    />
    <p class="text-xl">@{{ profile.username }}</p>
  </section>
  <AchievementList :achievementCodes="profile.achievements" :image-size="50" />
</template>
