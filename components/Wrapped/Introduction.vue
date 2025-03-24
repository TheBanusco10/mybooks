<script setup lang="ts">
const user = await usePublicUser();
const currentYear = new Date().getFullYear();
</script>

<template>
  <div>
    <p class="text-center text-5xl mb-8">MyBooks Wrapped {{ currentYear }}</p>
    <p class="text-center text-3xl mb-8" v-if="user">
      ¡Hola, {{ user.username }}!
    </p>
    <p>
      En este espacio, podrás disfrutar de un resumen exclusivo de tus aventuras
      lectoras del año. Descubre tus mejores libros, los autores favoritos que
      te han acompañado en tus viajes literarios, y mucho más.
      <br />
      <br />
      Pulsa "Comenzar" para sumergirte en un viaje por tus lecturas más
      destacadas. ¡Prepárate para sorprenderte con tus propias estadísticas y
      descubrir cuán lector eres! ¡Buena suerte y que disfrutes del viaje!
    </p>
  </div>
</template>
