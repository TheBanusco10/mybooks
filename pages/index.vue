<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { signOut } = useAuthStore();
</script>

<template>
  <main>
    <GothamContainer>
      <button class="btn btn-primary" @click="signOut">Sign out</button>
      <NuxtLink to="/books/add" class="btn btn-primary">Añadir libro</NuxtLink>
      <p>Tus libros</p>
      <BooksList />
    </GothamContainer>
  </main>
</template>
