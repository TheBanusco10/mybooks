<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { signOut } = useAuthStore();
</script>

<template>
  <main>
    <GothamContainer>
      <p class="text-3xl">Tus libros</p>
      <NuxtLink to="/books/add" class="btn btn-primary btn-sm my-4">
        <Icon name="mdi:book-plus" />
        Añadir libro
      </NuxtLink>
      <BooksList />
    </GothamContainer>
  </main>
</template>
