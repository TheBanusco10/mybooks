<script setup lang="ts">
import ProfileTabsAccountMain from "~/components/Profile/Tabs/Account/Main.vue";
import ProfileTabsStatisticsMain from "~/components/Profile/Tabs/Statistics/Main.vue";
import ReadingClubsMain from "~/components/Profile/Tabs/ReadingClubs/Main.vue";

const { t } = useI18n();

useHead({
  title: () => t("app.profile"),
});

const tabs = computed(() => [
  {
    label: t("app.statistics"),
    component: ProfileTabsStatisticsMain,
  },
  {
    label: t("app.account"),
    component: ProfileTabsAccountMain,
  },
  {
    label: t("app.bookClubs"),
    component: ReadingClubsMain,
  },
]);
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
