<script setup lang="ts">
interface Props {
  clubId: number;
}

const props = defineProps<Props>();

const emits = defineEmits(["onMessageSent"]);

const { sendMessage } = useReadingClubsStore();
const message = ref("");
const isFetching = ref(false);
const user = await usePublicUser();
const supabase = useSupabaseClient();

const isSendButtonDisabled = computed(() => !message.value || isFetching.value);

const handleSendMessage = async (evt: any) => {
  try {
    // Checks if the user is pressing shift + enter in order to short-circuit the flow
    // and add a break line (for dekstop)
    if (evt instanceof KeyboardEvent && evt.key === "Enter" && evt.shiftKey) {
      return;
    }

    const userMessage = message.value;

    const messageInformation = await sendMessage(userMessage, props.clubId);

    message.value = "";

    if (!user.value) return;

    emits("onMessageSent", messageInformation);
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <div class="p-2 bg-base-200">
    <form class="flex gap-2 w-full" @submit.prevent="handleSendMessage">
      <textarea
        class="textarea textarea-bordered textarea-xs flex-[80%] resize-none"
        :placeholder="$t('app.writeAMessage')"
        type="text"
        v-model="message"
        @keydown.enter.prevent="handleSendMessage"
      ></textarea>
      <button
        type="submit"
        class="btn btn-circle btn-primary"
        :disabled="isSendButtonDisabled"
      >
        <Icon name="mdi:send" />
      </button>
    </form>
  </div>
</template>
