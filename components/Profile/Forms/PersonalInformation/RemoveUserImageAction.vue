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
    {{ $t("forms.removeProfileImage") }}
  </button>

  <GothamModal id="remove_user_image" ref="removeUserImageModalRef">
    <template v-slot:title>
      {{ $t("forms.removeProfileImage") }}
    </template>
    <template v-slot:content>
      {{ $t("forms.removeProfileImageConfirmation") }}
    </template>
    <template v-slot:action>
      <button class="btn btn-error" @click="$emit('onRemoveUserImage')">
        {{ $t("forms.confirm") }}
      </button>
    </template>
  </GothamModal>
</template>
