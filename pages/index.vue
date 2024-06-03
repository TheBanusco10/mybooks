<script setup lang="ts"></script>

<template>
  <main>
    <GothamContainer>
      <NuxtLink to="/books/add" class="btn btn-primary">Añadir libro</NuxtLink>
      <p>Tus libros</p>
      <BooksList />
    </GothamContainer>
  </main>
</template>
