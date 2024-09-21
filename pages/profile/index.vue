<script setup lang="ts">
import ProfileTabsAccountMain from "~/components/Profile/Tabs/Account/Main.vue";

const tabs = [
  {
    label: "Cuenta",
    id: "account",
    component: ProfileTabsAccountMain,
  },
];
</script>

<template>
  <ProfileUserInformation />
  <GothamTab class="mt-4">
    <GothamTabItem
      v-for="({ id, label, component }, index) in tabs"
      :key="index"
      :id="id"
      :label="label"
      :checked="index === 0"
    >
      <component :is="component" />
    </GothamTabItem>
  </GothamTab>
</template>
