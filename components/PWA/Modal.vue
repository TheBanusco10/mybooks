<script setup lang="ts">
import { usePWAStore } from "~/stores/pwa";
import type { ModalRef } from "~/types/modals";

const pwaStore = usePWAStore();

const { installPWA, updateModalConsent, hookIntoInstallPrompt } = pwaStore;
const { canInstall, modalConsent } = storeToRefs(pwaStore);

const pwaModalRef = ref<ModalRef>();

const handleCancel = () => {
  updateModalConsent(false);
};

const handleInstall = () => {
  pwaModalRef.value?.dialogElement.close();
  installPWA();
};

watch(canInstall, () => {
  if (!canInstall.value || !modalConsent.value) return;

  pwaModalRef.value?.dialogElement.showModal();
});

onMounted(() => {
  hookIntoInstallPrompt();
});
</script>

<template>
  <GothamModal ref="pwaModalRef" id="pwa-modal" @onClose="handleCancel">
    <template v-slot:title>
      <h2>{{ $t("pwa.install_modal.title") }}</h2>
    </template>
    <template v-slot:content>
      <p>
        {{ $t("pwa.install_modal.description") }}
      </p>
    </template>
    <template v-slot:action>
      <button class="btn btn-primary" @click="handleInstall">
        {{ $t("pwa.install_modal.install_button") }}
      </button>
    </template>
  </GothamModal>
</template>
