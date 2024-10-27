<script setup lang="ts">
const { isUserLoggedIn, user } = storeToRefs(useAuthStore());

if (!isUserLoggedIn) {
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
    <p>
      {{ user?.user_metadata.email }}
    </p>
  </section>
</template>
