<script setup lang="ts">
const { isUserLoggedIn, user } = storeToRefs(useAuthStore());

if (!isUserLoggedIn.value) {
  await navigateTo("/login");
}
</script>

<template>
  <section class="flex flex-col md:flex-row gap-4 items-center">
    <div class="relative">
      <GothamAvatar
        :email="user?.user_metadata.email"
        :image-url="user?.user_metadata.image_url || null"
        :username="user?.user_metadata.username || null"
        size="xl"
      />
    </div>
    <div class="flex flex-col text-center md:text-start">
      <p v-if="user?.user_metadata.username" class="text-xl">
        @{{ user.user_metadata.username }}
      </p>
      <p class="text-sm text-base-content/60">
        {{ user?.user_metadata.email }}
      </p>
    </div>
  </section>
</template>
