<script setup lang="ts">
const route = useRoute();

const username = route.params.username as string;

const { getProfileByUsername } = useProfilesStore();

const { data, error } = useAsyncData(() => getProfileByUsername(username));

if (error.value) {
  throw createError({
    statusCode: 404,
    message: error.value.message,
  });
}
</script>

<template>
  <GothamContainer v-if="data">
    <section class="flex flex-col md:flex-row gap-4 items-center">
      <DiscoverProfileInformation :profile="data" />
    </section>
    <div class="divider"></div>
    <section v-if="!data.is_private">
      <!-- TODO: Add reading lists or something public related to user -->
    </section>
    <section v-else class="flex flex-col items-center gap-4">
      <Icon name="mdi:lock-alert-outline" size="64" />
      <p>{{ $t("app.privateProfile") }}</p>
    </section>
  </GothamContainer>
  <GothamContainer v-else>
    <p>{{ $t("app.profileNotFound") }}</p>
  </GothamContainer>
</template>
