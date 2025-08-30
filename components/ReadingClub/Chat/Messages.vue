<script setup lang="ts">
interface Props {
  messages: MessageInformation[];
}

defineProps<Props>();

const { publicUser } = usePublicUser();
</script>
<template>
  <div class="relative h-full">
    <div class="w-full h-full absolute p-2 overflow-y-scroll">
      <GothamBubble
        v-for="message in messages"
        :message="message"
        :current-user-id="publicUser?.id || ''"
      />
    </div>
  </div>
</template>
