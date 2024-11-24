<script setup lang="ts">
import type { ReadingClubInformation } from "~/types/readingClubs";

const { createReadingClub, addUserToReadingClub } = useReadingClubsStore();

const handleCreateReadingClub = async (values: ReadingClubInformation) => {
  try {
    const clubId = await createReadingClub(values);

    if (clubId === -1) await navigateTo("/");

    const user = useSupabaseUser();

    await addUserToReadingClub(user.value?.id || "", clubId, true);

    await navigateTo(`/reading-clubs/${clubId}`);
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <GothamContainer>
    <GothamHeader label="Crear club de lectura" />
    <section class="max-w-screen-sm">
      <ReadingClubInformationForm @onSubmit="handleCreateReadingClub" />
    </section>
  </GothamContainer>
</template>
