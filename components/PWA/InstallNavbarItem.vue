<script setup lang="ts">
const { installPWA, isPWAInstalled } = usePWAStore();
</script>

<template>
  <NavbarItem
    v-if="!isPWAInstalled()"
    name="Instalar aplicación"
    href="#"
    icon="mdi:download-outline"
    route=""
    @onClick="installPWA"
  />
</template>
