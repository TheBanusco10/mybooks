<script setup lang="ts">
import type { LoadingColor, LoadingSize } from "~/types/components/loading";

type Props = {
  size?: LoadingSize;
  color?: LoadingColor;
};

withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
});

const sizes: Record<LoadingSize, string> = {
  xs: "loading-xs",
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
  xl: "loading-xl",
};

const colors: Record<LoadingColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  neutral: "text-neutral",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};
</script>

<template>
  <span
    class="loading loading-ring"
    :class="[`${sizes[size]}`, `${colors[color]}`]"
  ></span>
</template>
