<script setup lang="ts">
import type { Profile } from '~/types/profiles';

defineProps<Props>();

interface Props {
    profile: Profile;
}
</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center">
    <GothamAvatar
      :image-url="profile.image_url"
      :username="profile.username"
      size="xl"
    />
    <p class="text-xl">@{{ profile.username }}</p>
  </div>
</template>
