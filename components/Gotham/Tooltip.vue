<script setup lang="ts">
import type { TooltipPosition } from "~/types/components/tooltip";

interface Props {
  tooltip: string;
  position?: TooltipPosition;
}

withDefaults(defineProps<Props>(), {
  position: "top",
});

const tooltipPositionMapping = {
  top: "tooltip-top",
  bottom: "tooltip-bottom",
  left: "tooltip-left",
  right: "tooltip-right",
};
</script>

<template>
  <div
    class="tooltip before:z-[999]"
    :data-tip="tooltip"
    :class="tooltipPositionMapping[position]"
  >
    <slot />
  </div>
</template>
