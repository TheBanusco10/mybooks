<script setup lang="ts">
import ProfileTabsAccountMain from "~/components/Profile/Tabs/Account/Main.vue";
import ProfileTabsStatisticsMain from "~/components/Profile/Tabs/Statistics/Main.vue";

const tabs = [
  {
    label: "Estadísticas",
    component: ProfileTabsStatisticsMain,
  },
  {
    label: "Cuenta",
    component: ProfileTabsAccountMain,
  },
];
</script>

<template>
  <GothamContainer>
    <ProfileUserInformation />
    <GothamTab class="mt-4">
      <GothamTabItem
        v-for="({ label, component }, index) in tabs"
        :key="index"
        id="profile-tabs"
        :label="label"
        :checked="index === 0"
      >
        <component :is="component" />
      </GothamTabItem>
    </GothamTab>
  </GothamContainer>
</template>
