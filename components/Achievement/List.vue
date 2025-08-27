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
      v-for="code in achievementCodes"
      :key="code"
      :code="code"
      :image-size="imageSize"
    />
  </section>
</template>
