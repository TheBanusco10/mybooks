<script setup lang="ts">
import type { ModalRef } from "~/types/modals";

defineEmits(["onRemoveUserImage"]);

const removeUserImageModalRef = ref<ModalRef>();
</script>

<template>
  <button
    class="mt-4 btn btn-error btn-outline btn-sm"
    @click="removeUserImageModalRef?.dialogElement.showModal()"
    type="button"
  >
    Eliminar foto de perfil
  </button>

  <GothamModal id="remove_user_image" ref="removeUserImageModalRef">
    <template v-slot:title> Eliminar foto de perfil </template>
    <template v-slot:content>
      ¿Estás seguro de que deseas eliminar tu foto de perfil?
    </template>
    <template v-slot:action>
      <button class="btn btn-error" @click="$emit('onRemoveUserImage')">
        Confirmar
      </button>
    </template>
  </GothamModal>
</template>
