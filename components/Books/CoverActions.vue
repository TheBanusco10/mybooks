<script setup lang="ts">
import { useBooksStore } from "~/stores/books";

interface Props {
  id: number;
  title: string;
}

const props = defineProps<Props>();

const { removeBook } = useBooksStore();
const isRemoving = ref(false);
const removeModalRef = ref<HTMLDialogElement | null>(null);

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
    <NuxtLink to="/books/edit/" class="btn btn-circle btn-sm">
      <Icon name="mdi:pencil-outline" size="1rem" />
    </NuxtLink>
    <button class="btn btn-circle btn-sm" @click="removeModalRef?.showModal()">
      <Icon name="mdi:trash-can-outline" size="1rem" />
    </button>
  </div>

  <dialog
    id="remove_modal"
    class="modal modal-bottom sm:modal-middle"
    ref="removeModalRef"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg">Eliminando {{ title }}</h3>
      <p class="py-4">¿Estás seguro de que desea eliminar este libro?</p>
      <div class="modal-action">
        <form method="dialog" class="w-full flex justify-between">
          <button class="btn">Cancelar</button>
          <button
            class="btn btn-error btn-outline"
            @click.prevent="handleRemoveBook"
            :disabled="isRemoving"
          >
            <span v-show="isRemoving" class="loading loading-spinner"></span>
            Eliminar
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
