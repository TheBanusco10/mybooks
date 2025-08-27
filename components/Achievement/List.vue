<script setup lang="ts">
interface Props {
  achievementCodes: string[];
  imageSize?: number;
}

withDefaults(defineProps<Props>(), {
  imageSize: 100,
});
</script>

<template>
  <section class="flex flex-wrap">
    <AchievementItem
      v-for="achievementCode in achievementCodes"
      :key="achievementCode"
      :code="achievementCode"
      :image-size="imageSize"
    />
  </section>
</template>
