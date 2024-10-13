<script setup lang="ts">
import type { CreateReadingClub } from "~/types/readingClubs";

const { createReadingClub, addUserToReadingClub } = useReadingClubsStore();

const handleCreateReadingClub = async (values: CreateReadingClub) => {
  try {
    const clubId = await createReadingClub(values);
    console.log(clubId);

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
      <GothamForm submitLabel="Crear" @submit="handleCreateReadingClub">
        <FormKit
          name="image"
          label="Imagen de club"
          help="Añade una URL para la imagen del club"
        />
        <FormKit name="name" label="Título" validation="required" />
        <FormKit name="description" type="textarea" label="Descripción" />
        <FormKit
          type="toggle"
          name="is_private"
          label="Club privado"
          :value="true"
          help="Si la opción está activada, el club se creará como privado y no aparecerá en la lista de Clubes. Se necesita unir manualmente a los usuarios deseados."
        />
      </GothamForm>
    </section>
  </GothamContainer>
</template>
