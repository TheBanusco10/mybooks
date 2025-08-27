<script setup lang="ts">
interface Props {
  code: string;
  imageSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  imageSize: 100,
});

const { getAchievementFromCode } = useAchievements();

const achievementTooltip = computed(() => {
  const achievementInfo = getAchievementFromCode(props.code);
  return achievementInfo?.label || "";
});
</script>

<template>
  <article>
    <GothamTooltip :tooltip="achievementTooltip">
      <img
        :src="`/images/achievements/${code}.png`"
        alt=""
        :width="imageSize"
        :height="imageSize"
      />
    </GothamTooltip>
  </article>
</template>
