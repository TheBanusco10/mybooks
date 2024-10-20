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

const { data: isMember } = await useAsyncData(() =>
  isUserInReadingClub(userId, clubId),
);

await checkUserAndReadingClubVisibility();

// TODO Move to MembersInformation component
const { data: membersInformation } = await useAsyncData(() =>
  getReadingClubMembers(clubId),
);

async function checkUserAndReadingClubVisibility() {
  // Checks if the reading club is private and the user is member
  if (readingClub.value?.is_private && !isMember.value) {
    await navigateTo("/");
  }
}
</script>

<template>
  <main id="club-detail" class="h-dvh flex flex-col">
    <section class="bg-neutral text-white p-4 shadow">
      {{ readingClub?.name }}
    </section>
    <section class="relative flex-grow">
      <ReadingClubJoinSection
        v-if="!isMember"
        :user-id="userId"
        :club-id="clubId"
        @on-user-added="() => (isMember = true)"
      />
    </section>
  </main>
</template>

<style>
#main-content:has(#club-detail) {
  @apply p-0;
}
</style>
