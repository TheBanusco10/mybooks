<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
} from "@headlessui/vue";
import type { Category } from "~/types/category";

const emits = defineEmits(["onSelectCategory"]);

const { categories } = useCategories();

const selectedCategories = ref<Category[]>([]);

const query = ref("");

const filteredCategories = computed(() =>
  query.value === ""
    ? categories
    : categories.filter((category) => {
        return category.label.toLowerCase().includes(query.value.toLowerCase());
      })
);

watch(selectedCategories, () => {
  emits("onSelectCategory", selectedCategories.value);
});
</script>

<template>
  <Combobox
    as="div"
    v-model="selectedCategories"
    multiple
    class="flex flex-col gap-2"
  >
    <ComboboxLabel class="label-text">Categorías:</ComboboxLabel>
    <ul v-if="selectedCategories.length > 0" class="flex flex-row gap-1">
      <li v-for="category in selectedCategories" :key="category.value">
        <span class="badge badge-secondary badge-outline badge-md">{{
          category.label
        }}</span>
      </li>
    </ul>
    <ComboboxInput
      class="border rounded shadow p-2"
      @change="query = $event.target.value"
      placeholder="Buscar por nombre..."
    />
    <ComboboxOptions
      class="max-h-[10.5rem] overflow-y-scroll bg-white rounded border mt-1 overflow-hidden"
    >
      <ComboboxOption
        v-for="category in filteredCategories"
        :key="category.value"
        :value="category"
        class="border-b last:border-none cursor-pointer hover:bg-gray-50 transition"
        v-slot="{ selected }"
      >
        <li :class="selected && 'bg-secondary'" class="p-2 w-auto">
          {{ category.label }}
        </li>
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>
