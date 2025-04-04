<template>
  <GothamContainer :showBackButton="false" class="w-1/2 flex flex-col gap-4">
    <p class="text-3xl font-bold">
      {{ $t("app.confirmAccountTitle") }}
    </p>
    <p>
      {{ $t("app.confirmAccountDescription") }}
    </p>
    <NuxtLink to="/login" class="btn">
      {{ $t("app.backToLogin") }}
    </NuxtLink>
  </GothamContainer>
</template>
