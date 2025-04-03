<script setup lang="ts">
import WrappedIntroduction from "~/components/Wrapped/Introduction.vue";
import WrappedBooksRead from "~/components/Wrapped/BooksRead/Component.vue";
import WrappedPagesRead from "~/components/Wrapped/PagesRead.vue";
import WrappedBestBooks from "~/components/Wrapped/BestBooks/Component.vue";
import WrappedMostReadCategories from "~/components/Wrapped/MostReadCategories/Component.vue";
import WrappedMostReadAuthors from "~/components/Wrapped/MostReadAuthors.vue";
import WrappedSummary from "~/components/Wrapped/Summary.vue";

const { isEnabled } = useWrappedStore();

if (!isEnabled) {
  await navigateTo("");
}

const wrappedStepIndex = ref(0);

const wrappedSteps = [
  WrappedIntroduction,
  WrappedBooksRead,
  WrappedPagesRead,
  WrappedBestBooks,
  WrappedMostReadCategories,
  WrappedMostReadAuthors,
  WrappedSummary,
];
</script>

<template>
  <GothamContainer
    class="relative flex flex-col justify-between h-full !mt-0 overflow-hidden"
  >
    <WrappedBackgroundImage class="left-0 -top-3" animation="rotate" />
    <WrappedBackgroundImage class="bottom-0 right-0" animation="float" />
    <template v-for="(step, index) in wrappedSteps">
      <component
        v-if="index === wrappedStepIndex"
        :is="step"
        :key="index"
        @onNextStep="wrappedStepIndex++"
        class="animate__animated animate__fadeIn"
      />
    </template>
    <div class="flex gap-4 my-4">
      <button
        class="btn btn-primary w-fit mx-auto"
        @click="wrappedStepIndex--"
        :disabled="wrappedStepIndex === 0"
        v-show="wrappedStepIndex !== 0"
      >
        <Icon name="mdi:arrow-left" />
        Volver
      </button>
      <button
        class="btn btn-primary w-fit mx-auto"
        @click="wrappedStepIndex++"
        :disabled="wrappedStepIndex === wrappedSteps.length - 1"
        v-show="wrappedStepIndex !== wrappedSteps.length - 1"
      >
        {{ wrappedStepIndex === 0 ? "Comenzar" : "Siguiente" }}
        <Icon name="mdi:arrow-right" />
      </button>
    </div>
  </GothamContainer>
</template>

<style lang="css">
@import "animate.css";

#main-content {
  @apply h-[calc(100dvh-48px)] /*48px from header height*/;
  @apply pb-0;
}
</style>
