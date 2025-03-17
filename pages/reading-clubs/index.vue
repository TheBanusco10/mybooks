<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: () => t("app.bookClubs"),
});
</script>

<template>
  <GothamContainer>
    <GothamHeader :label="$t('app.bookClubs')" />
    <NuxtLink to="/reading-clubs/create" class="btn btn-primary mt-4">
      {{ $t("forms.create") }}
    </NuxtLink>
    <ReadingClubList />
  </GothamContainer>
</template>
