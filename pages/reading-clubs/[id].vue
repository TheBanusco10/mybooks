<script setup lang="ts">
const route = useRoute();

let id = route.params.id;

if (isArray(id)) {
  id = id[0];
}

const clubId = parseInt(id);

const {
  getReadingClubInformation,
  isUserInReadingClub,
  getReadingClubMembers,
} = useReadingClubsStore();

const { data: readingClub } = await useAsyncData(() =>
  getReadingClubInformation(clubId),
);

if (!readingClub.value) {
  await navigateTo("/");
}

const user = useSupabaseUser();

const userId = user.value?.id || "";

// Checks if the reading club is private and the user is member
if (readingClub.value?.is_private) {
  const { data: isMember } = await useAsyncData(() =>
    isUserInReadingClub(userId, clubId),
  );

  if (!isMember.value) await navigateTo("/");
}

// TODO Move to MembersInformation component
const { data: membersInformation } = await useAsyncData(() =>
  getReadingClubMembers(clubId),
);
</script>

<template>
  <main id="club-detail" class="h-dvh">
    <section class="bg-neutral text-white p-4 shadow">
      {{ readingClub?.name }}
    </section>
  </main>
</template>

<style>
#main-content:has(#club-detail) {
  @apply px-0;
}
</style>
