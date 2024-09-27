<template>
  <section class="flex flex-col gap-4">
    <section class="flex gap-2 lg:gap-0 flex-wrap items-end">
      <ProfileTabsStatisticsTotalBooks />
      <div class="hidden lg:flex divider divider-horizontal"></div>
      <ProfileTabsStatisticsTotalPages />
    </section>
    <ProfileTabsStatisticsHighRatedBooks />
    <ProfileTabsStatisticsTopCategoriesMain />
  </section>
</template>
