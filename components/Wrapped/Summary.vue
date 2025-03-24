<script setup lang="ts">
const { wrappedSummary } = useWrappedStore();

const nextYear = new Date().getFullYear() + 1;
</script>

<template>
  <div>
    <p class="text-center text-4xl mb-4">¡Este es tu resumen!</p>
    <p>
      Descarga tu resumen y guárdalo para el futuro o compártelo con tus amigos
      y en redes sociales. ¡Nos vemos en el Wrapped {{ nextYear }}!
    </p>
    <p>Summary here</p>
  </div>
</template>
