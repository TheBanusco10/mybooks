<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  members: Row<"profiles">[];
}

defineProps<Props>();
</script>

<template>
  <MembersItem v-for="member in members" :key="member.id" :member="member" />
</template>
