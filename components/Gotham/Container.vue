<script setup lang="ts">
interface Props {
  showBackButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: true,
});
</script>

<template>
  <div class="container mx-auto">
    <section v-if="showBackButton">
      <GothamFloatButton @on-click="$router.back()">
        <template v-slot:icon>
          <Icon name="mdi:chevron-left" class="scale-150 md:scale-125" />
        </template>
        <template v-slot:label>
          {{ $t("app.goBack") }}
        </template>
      </GothamFloatButton>
    </section>
    <slot />
  </div>
</template>
