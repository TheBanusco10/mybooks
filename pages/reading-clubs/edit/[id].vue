<script setup lang="ts">
import type { ReadingClubsError } from "~/errors/readingClubs";
import type { ReadingClubInformation } from "~/types/readingClubs";

const route = useRoute();

const { getReadingClubIdFromUrl } = useReadingClub();

const readingClubId = getReadingClubIdFromUrl();

const { getReadingClubInformation, updateReadingClub, isUserOwner } =
  useReadingClubsStore();

const { data: readingClub } = await useAsyncData(() =>
  getReadingClubInformation(readingClubId)
);

const user = useSupabaseUser();

const { data: isOwner } = await useAsyncData(() =>
  isUserOwner(user.value?.id || "", readingClubId)
);

if (!readingClub.value || !isOwner.value) {
  await navigateTo("/");
}

const handleUpdateReadingClub = async (values: ReadingClubInformation) => {
  try {
    await updateReadingClub(readingClubId, values);

    await navigateTo(`/reading-clubs/${readingClubId}`);
  } catch (err: any) {
    const error: ReadingClubsError = err;

    console.error(error.message);
  }
};
</script>

<template>
  <GothamContainer>
    <GothamHeader label="Editar club de lectura" />
    <ReadingClubInformationForm
      v-if="readingClub"
      v-bind="{
        image: readingClub.image || '',
        name: readingClub.name,
        description: readingClub.description || '',
        is_private: readingClub.is_private!,
      }"
      @on-submit="handleUpdateReadingClub"
      submit-label="Editar"
    />
  </GothamContainer>
</template>
