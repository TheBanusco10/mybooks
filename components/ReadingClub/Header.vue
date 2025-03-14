<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  readingClub: Row<"reading_clubs">;
  isMember?: boolean | null;
  isOwner?: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
  isMember: false,
  isOwner: false,
});

const { getReadingClubMembers } = useReadingClubsStore();

const { data: membersInformation, execute: getMembersInformation } =
  await useAsyncData(
    "membersInformation",
    () => getReadingClubMembers(props.readingClub.id),
    {
      watch: [() => props.isMember],
    }
  );

const membersName = computed(
  () =>
    membersInformation.value
      ?.map((member) => member.username || member.email)
      .join(", ") || []
);

const togglePanelInput = ref<HTMLInputElement | null>(null);

const handleTogglePanel = () => {
  if (!togglePanelInput.value) return;

  togglePanelInput.value.checked = !togglePanelInput.value.checked;
};
</script>

<template>
  <div class="drawer drawer-end">
    <input
      id="reading-club-information"
      type="checkbox"
      class="drawer-toggle"
      ref="togglePanelInput"
    />
    <div
      class="drawer-content bg-base-100 p-4 shadow flex justify-between items-center hover:bg-opacity-50 transition duration-300 hover:cursor-pointer"
      @click="handleTogglePanel"
    >
      <section class="flex gap-4 w-[90%] md:w-auto">
        <GothamAvatar
          :image-url="readingClub.image || '/images/placeholder.svg'"
          :show-letter="false"
        />
        <div class="text-start truncate">
          <p class="text-lg text-ellipsis whitespace-nowrap overflow-hidden">
            {{ readingClub?.name }}
          </p>
          <p
            class="text-xs text-ellipsis whitespace-nowrap overflow-hidden"
            v-if="membersInformation?.length"
          >
            {{ membersName }}
          </p>
        </div>
      </section>
      <section class="md:w-auto">
        <Icon name="mdi:arrow-right" size="1.5rem" />
      </section>
    </div>
    <div class="drawer-side z-[9999]">
      <label
        for="reading-club-information"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-72 p-4">
        <section class="flex flex-col gap-4">
          <section class="relative flex flex-col items-center">
            <GothamAvatar
              :image-url="readingClub.image || '/images/placeholder.svg'"
              :show-letter="false"
            />
            <p class="text-lg text-center mt-4">
              {{ readingClub?.name }}
            </p>
            <NuxtLink
              class="absolute top-0 left-0 btn btn-sm btn-circle btn-neutral"
              v-if="isOwner"
              :to="`/reading-clubs/edit/${readingClub.id}`"
            >
              <Icon name="mdi:pencil-outline" />
            </NuxtLink>
            <section v-if="isMember">
              <ReadingClubActionsLeaveGroup
                v-if="!isOwner"
                class="absolute top-0 right-0"
                :club-id="readingClub.id"
              />
              <ReadingClubActionsRemoveGroup
                v-else
                class="absolute top-0 right-0"
                :club-id="readingClub.id"
              />
            </section>
          </section>
          <div class="divider m-0"></div>
          <section>
            <p v-if="readingClub.description">
              {{ readingClub.description }}
            </p>
            <p v-else class="italic">Sin descripción</p>
          </section>
          <section v-if="membersInformation">
            <p class="text-lg font-bold mb-2">Miembros</p>
            <section v-if="isMember && isOwner">
              <ReadingClubActionsInviteUser
                :club-id="readingClub.id"
                @on-user-invited="getMembersInformation"
              />
            </section>
            <div class="flex flex-col p-2 rounded bg-base-300">
              <MembersItem
                v-for="member in membersInformation"
                :key="member.id"
                :member="member"
                :show-actions="isOwner || false"
                :club="readingClub"
                @on-user-removed="getMembersInformation"
              />
            </div>
          </section>
        </section>
      </ul>
    </div>
  </div>
</template>
