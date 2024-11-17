<script setup lang="ts">
interface Props {
  clubId: number;
}

const props = defineProps<Props>();

const supabase = useSupabaseClient();

const { getMessages } = useReadingClubsStore();

const { data: messages } = await useAsyncData(() => getMessages(props.clubId));

const channel = supabase.channel(`room-${props.clubId}`, {
  config: {
    broadcast: { self: true },
  },
});

const updateMessagesList = async (messageInformation: MessageInformation) => {
  messages.value!.push(messageInformation);

  await nextTick();

  const lastMessageElement = getLastMessageElement();

  if (!lastMessageElement) return;

  scrollIntoView(lastMessageElement, "smooth");
};

// Subscribe to the Channel
channel
  .on("broadcast", { event: "chat-message" }, ({ payload }) =>
    updateMessagesList(payload)
  )
  .subscribe();

const handleOnMessageSent = async (messageInformation: MessageInformation) => {
  const payload: MessageInformation = messageInformation;

  channel.send({
    type: "broadcast",
    event: "chat-message",
    payload,
  });
};

const scrollIntoView = (element: Element, behavior: "smooth" | "instant") => {
  element.scrollIntoView({ behavior });
};

const getLastMessageElement = () => {
  return document.querySelector(".chat:last-child") || null;
};

onMounted(() => {
  // Wait for the DOM to be ready when users join reading clubs
  setTimeout(() => {
    const lastMessage = getLastMessageElement();
    console.log(lastMessage);

    if (!lastMessage) return;

    scrollIntoView(lastMessage, "instant");
  }, 50);
});

onBeforeUnmount(() => {
  channel.unsubscribe();
});
</script>

<template>
  <section class="flex justify-between flex-col flex-grow">
    <ReadingClubChatMessages :messages="messages!" />
    <ReadingClubChatBox
      @on-message-sent="handleOnMessageSent"
      :club-id="clubId"
    />
  </section>
</template>
