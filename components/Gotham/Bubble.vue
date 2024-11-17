<script setup lang="ts">
interface Props {
  message: MessageInformation;
  currentUserId: string;
}

defineProps<Props>();

const { formatDate } = useFormatter();
</script>

<template>
  <div
    class="chat"
    :class="[message.user.id === currentUserId ? 'chat-end' : 'chat-start']"
  >
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="user avatar"
          :src="message.user.image_url || '/images/placeholder.svg'"
        />
      </div>
    </div>
    <div class="chat-header">
      {{ message.user.username || message.user.email }}
      <time class="text-xs opacity-50">
        {{ formatDate(message.created_at || "") }}
      </time>
    </div>
    <div class="chat-bubble text-white">
      {{ message.message }}
    </div>
  </div>
</template>
