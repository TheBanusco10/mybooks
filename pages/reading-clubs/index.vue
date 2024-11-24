<script setup lang="ts"></script>

<template>
  <GothamContainer>
    <GothamHeader label="Clubs de lectura" />
    <NuxtLink to="/reading-clubs/create" class="btn btn-primary mt-4"
      >Crear club de lectura</NuxtLink
    >
    <ReadingClubList />
  </GothamContainer>
</template>
