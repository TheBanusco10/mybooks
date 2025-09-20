<script setup lang="ts">
const { installPWA, isPWAInstalled } = usePWAStore();
</script>

<template>
  <NavbarItem
    v-if="!isPWAInstalled()"
    :name="$t('pwa.install_application')"
    href="#"
    icon="mdi:download-outline"
    route=""
    @onClick="installPWA"
  />
</template>
