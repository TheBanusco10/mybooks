<script setup lang="ts">
const { installPWA, isPWAInstalled } = usePWAStore();

console.log(isPWAInstalled());
</script>

<template>
  <NavbarItem v-if="!isPWAInstalled" name="Install app" href="#" icon="mdi:download-outline" route="" @onClick="installPWA" />
</template>
