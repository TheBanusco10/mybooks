<script setup lang="ts">
const { getPagesRead } = useWrappedStore();

const { data } = useAsyncData("wrappedPagesRead", () => getPagesRead());
</script>

<template>
  <div
    class="flex flex-col flex-1 justify-between animate__animated animate__fadeIn"
  >
    <div>
      <p class="text-center text-4xl mb-4">Tu lectura de este año</p>
      <p>
        ¡Vaya ritmo de lectura llevas! Con
        <span class="mx-1 text-2xl font-bold italic">{{
          data?.totalNumberPages
        }}</span>
        páginas devoradas este año, has invertido la friolera de
        <span class="mx-1 text-2xl font-bold italic">{{
          data?.totalReadTime
        }}</span>
        hora(s)* disfrutando de tus libros. ¡Enhorabuena por esa dedicación!
      </p>
    </div>
    <p class="text-sm text-base-content/70 mb-4">
      * Esto es una estimación basada en el tiempo promedio de lectura de una
      página.
    </p>
  </div>
</template>
