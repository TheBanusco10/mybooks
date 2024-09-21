<script setup lang="ts">
interface Props {
  imageUrl: string | null;
  email?: string;
  size?: "xl" | "lg" | "md" | "sm";
}

withDefaults(defineProps<Props>(), {
  size: "md",
});

const sizes = {
  xl: {
    image: "w-24",
    text: "text-3xl",
  },
  lg: {
    image: "w-16",
    text: "text-xl",
  },
  md: {
    image: "w-12",
    text: "",
  },
  sm: {
    image: "w-8",
    text: "text-xs",
  },
};
</script>

<template>
  <div class="avatar" :class="{ placeholder: isNull(imageUrl) }">
    <div
      class="rounded-full"
      :class="[
        isNull(imageUrl) && 'bg-neutral text-neutral-content',
        sizes[size]['image'],
      ]"
    >
      <span v-if="isNull(imageUrl)" :class="sizes[size]['text']">
        {{ email?.charAt(0).toUpperCase() || "A" }}
      </span>
      <img v-else :src="imageUrl" />
    </div>
  </div>
</template>
