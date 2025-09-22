<script setup lang="ts">
interface Props {
  imageUrl: string | null;
  email?: string;
  size?: "xl" | "lg" | "md" | "sm";
  username?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
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

const hasImage = computed(
  () => !isNull(props.imageUrl) && !isEmpty(props.imageUrl)
);
</script>

<template>
  <div class="avatar" :class="{ 'avatar-placeholder': !hasImage }">
    <div
      class="rounded-full"
      :class="[
        !hasImage && 'bg-neutral text-neutral-content',
        sizes[size]['image'],
      ]"
    >
      <span v-if="!hasImage" :class="sizes[size]['text']">
        {{
          username?.charAt(0).toUpperCase() ||
          email?.charAt(0).toUpperCase() ||
          "A"
        }}
      </span>
      <img v-else :src="imageUrl!" />
    </div>
  </div>
</template>
