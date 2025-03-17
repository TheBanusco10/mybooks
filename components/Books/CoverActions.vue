<script setup lang="ts">
import { useBooksStore } from "~/stores/books";
import type { ModalRef } from "~/types/modals";

interface Props {
  id: number;
  title: string;
}

const props = defineProps<Props>();

const { removeBook } = useBooksStore();
const isRemoving = ref(false);
const removeModalRef = ref<ModalRef>();

const handleRemoveBook = async () => {
  try {
    isRemoving.value = true;

    await removeBook(props.id);

    await navigateTo("/");
  } catch (err: any) {
    console.error(err.message);
  } finally {
    isRemoving.value = false;
  }
};
</script>

<template>
  <div
    class="absolute bottom-0 right-0 flex justify-between w-full items-center py-2 px-2"
  >
    <NuxtLink :to="`/books/edit/${id}`" class="btn btn-circle btn-sm">
      <Icon name="mdi:pencil-outline" size="1rem" />
    </NuxtLink>
    <button
      class="btn btn-circle btn-sm"
      @click="removeModalRef?.dialogElement.showModal()"
    >
      <Icon name="mdi:trash-can-outline" size="1rem" />
    </button>
  </div>

  <GothamModal id="remove_modal" ref="removeModalRef">
    <template v-slot:title>
      {{ $t("app.removing", { name: title }) }}
    </template>
    <template v-slot:content>
      {{ $t("app.removeBookHelp") }}
    </template>
    <template v-slot:action>
      <button
        class="btn btn-error btn-outline"
        @click.prevent="handleRemoveBook"
        :disabled="isRemoving"
      >
        <span v-show="isRemoving" class="loading loading-spinner"></span>
        {{ $t("forms.remove") }}
      </button>
    </template>
  </GothamModal>
</template>
