<script setup lang="ts">
import type { ModalRef } from "~/types/modals";

const installModal = useTemplateRef<ModalRef>("installModal");
const { shouldShowModal, showInstallModalCookie, installApp } = usePWAInstall();

onMounted(() => {
  if (!shouldShowModal.value) return;

  installModal.value?.dialogElement.showModal();
});
</script>

<template>
  <GothamModal
    id="installModal"
    ref="installModal"
    @onClose="showInstallModalCookie = false"
  >
    <template v-slot:title>¡Tenemos aplicación!</template>
    <template v-slot:content
      >Ya puedes instalar la aplicación de MyBooks con tan solo un clic y
      acceder de forma rápida y sencilla. ¡Pruébalo!</template
    >
    <template v-slot:action>
      <button class="btn btn-primary" @click="installApp">Instalar</button>
    </template>
  </GothamModal>
</template>
