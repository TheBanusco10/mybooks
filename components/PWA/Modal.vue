<script setup lang="ts">
import type { ModalRef } from "~/types/modals";

const pwaStore = usePWAStore();

const { installPWA, updateModalConsent } = pwaStore;
const { canInstall, modalConsent } = storeToRefs(pwaStore);

const pwaModalRef = ref<ModalRef>();

const handleCancel = () => {
  updateModalConsent(false);
};

const handleInstall = () => {
    pwaModalRef.value?.dialogElement.close();
    installPWA();
}

watch(canInstall, () => {
  if (!canInstall.value || !modalConsent.value) return;

  pwaModalRef.value?.dialogElement.showModal();
});
</script>

<template>
  <GothamModal ref="pwaModalRef" id="pwa-modal" @onClose="handleCancel">
    <template v-slot:title>
      <h2>¡Tenemos aplicación!</h2>
    </template>
    <template v-slot:content>
      <p>
        MyBooks ya tiene aplicación, si deseas instalarla, solo tienes que hacer
        clic en el botón "Instalar". ¡Pruébalo ya!
      </p>
    </template>
    <template v-slot:action>
      <button class="btn btn-primary" @click="handleInstall">Instalar</button>
    </template>
  </GothamModal>
</template>
