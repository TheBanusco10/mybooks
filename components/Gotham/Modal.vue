<script setup lang="ts">
interface Props {
  id: string;
}

defineProps<Props>();

const dialogElement = ref<HTMLDialogElement>();

defineExpose({
  dialogElement,
});
</script>

<template>
  <dialog
    :id="id"
    class="modal modal-bottom sm:modal-middle"
    ref="dialogElement"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        <slot name="title" />
      </h3>
      <p class="py-4">
        <slot name="content" />
      </p>
      <div class="modal-action">
        <form method="dialog" class="w-full flex justify-between">
          <button class="btn">Cancelar</button>
          <slot name="action" />
        </form>
      </div>
    </div>
  </dialog>
</template>
