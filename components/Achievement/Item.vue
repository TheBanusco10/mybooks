<script setup lang="ts">
interface Props {
  code: string;
  imageSize?: number;
}

withDefaults(defineProps<Props>(), {
  imageSize: 100,
});

const { getAchievementFromCode } = useAchievements();
</script>

<template>
  <article>
    <GothamTooltip :tooltip="getAchievementFromCode(code)?.label || ''">
      <img
        :src="`/images/achievements/${code}.png`"
        alt=""
        :width="imageSize"
        :height="imageSize"
      />
    </GothamTooltip>
  </article>
</template>
