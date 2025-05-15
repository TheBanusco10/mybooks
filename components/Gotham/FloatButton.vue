<script setup lang="ts">
const FLOAT_BUTTON_TYPE = {
    BUTTON: 'button',
    LINK: 'link',
} as const;

type FloatButtonKeys = keyof typeof FLOAT_BUTTON_TYPE;
type FloatButtonValues = (typeof FLOAT_BUTTON_TYPE)[FloatButtonKeys];
type ButtonPositionType = 'bottom-left' | 'bottom-right';

interface Props {
    buttonPosition?: ButtonPositionType;
    buttonType?: FloatButtonValues;
    to?: string;
}

withDefaults(defineProps<Props>(), {
    buttonPosition: 'bottom-left',
    buttonType: 'button',
    to: '',
});

defineEmits(['onClick']);

const { showButton, addScrollListener, removeScrollListener } =
  useFloatButton();

const buttonPositionClass: Record<ButtonPositionType, string> = {
    'bottom-left': 'left-4 bottom-0',
    'bottom-right': 'right-4 bottom-0',
}

onMounted(() => addScrollListener());
onUnmounted(() => removeScrollListener());
</script>

<template>
  <button
    v-if="buttonType === FLOAT_BUTTON_TYPE.BUTTON"
    :class="[
      'fixed z-50 md:relative btn btn-primary rounded-full md:rounded md:inset-x-auto md:inset-y-auto mb-4 transition-transform ease-in-out duration-300',
      { 'translate-y-20 md:translate-y-0': !showButton },
      buttonPositionClass[buttonPosition],
    ]"
    @click="$emit('onClick')"
  >
    <slot name="icon" />
    <span class="hidden md:inline">
        <slot name="label" />
    </span>
  </button>

  <NuxtLink
    v-else
    :to="to"
    :class="[
      'fixed z-50 md:relative btn btn-primary rounded-full md:rounded md:inset-x-auto md:inset-y-auto mb-4 transition-transform ease-in-out duration-300',
      { 'translate-y-20 md:translate-y-0': !showButton },
      buttonPositionClass[buttonPosition],
    ]"
  >
    <slot name="icon" />
    <span class="hidden md:inline">
        <slot name="label" />
    </span>
  </NuxtLink>
</template>
