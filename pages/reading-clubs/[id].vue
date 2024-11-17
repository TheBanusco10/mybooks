<script setup lang="ts">
const { getReadingClubIdFromUrl } = useReadingClub();

const clubId = getReadingClubIdFromUrl();

const { getReadingClubInformation, isUserInReadingClub, isUserOwner } =
  useReadingClubsStore();

const { data: readingClub } = await useAsyncData(() =>
  getReadingClubInformation(clubId)
);

if (!readingClub.value) {
  await navigateTo("/");
}

const user = useSupabaseUser();

const userId = user.value?.id || "";

const { data: isMember } = await useAsyncData(() =>
  isUserInReadingClub(userId, clubId)
);

const { data: isOwner } = await useAsyncData(() => isUserOwner(userId, clubId));

await checkUserAndReadingClubVisibility();

async function checkUserAndReadingClubVisibility() {
  // Checks if the reading club is private and the user is member
  if (readingClub.value?.is_private && !isMember.value) {
    await navigateTo("/");
  }
}
</script>

<template>
  <!-- 48px mobile header height -->
  <main id="club-detail" class="h-[calc(100dvh-48px)] md:h-dvh flex flex-col">
    <ReadingClubHeader
      :reading-club="readingClub!"
      :is-member="isMember"
      :is-owner="isOwner"
    />
    <section class="flex relative flex-grow">
      <ReadingClubJoinSection
        v-if="!isMember"
        :user-id="userId"
        :club-id="clubId"
        @on-user-added="() => (isMember = true)"
      />
      <ReadingClubChatMain v-else :club-id="clubId" />
    </section>
  </main>
</template>

<style>
#main-content:has(#club-detail) {
  @apply p-0;
}
</style>
