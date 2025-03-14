<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
  ComboboxButton,
} from "@headlessui/vue";
import type { Category } from "~/types/category";

interface Props {
  defaultValues?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  defaultValues: () => [],
});

const emits = defineEmits(["onSelectCategory"]);

const { categories, getCategory } = useCategories();

const selectedCategories = ref<Category[]>(
  props.defaultValues.map((value) => getCategory(value))
);

const query = ref("");

const filteredCategories = computed(() =>
  query.value === ""
    ? categories
    : categories.filter((category) => {
        return category.label.toLowerCase().includes(query.value.toLowerCase());
      })
);

if (props.defaultValues.length) {
  emits("onSelectCategory", selectedCategories.value);
}

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
    <ComboboxLabel id="category-label" class="label-text"
      >Categorías:</ComboboxLabel
    >
    <BooksCategoryBadgesList
      :categories="selectedCategories.map(({ value }) => value)"
      span-classes="badge-outline"
    />
    <div class="join">
      <ComboboxInput
        class="w-full input input-bordered rounded shadow p-2 join-item placeholder:text-base-content"
        id="category-input"
        @change="query = $event.target.value"
        placeholder="Buscar por nombre..."
      />
      <ComboboxButton class="btn btn-primary join-item" v-slot="{ open }">
        <span class="swap" :class="{ 'swap-active': open }">
          <Icon class="swap-off" name="mdi:arrow-right" />
          <Icon class="swap-on" name="mdi:arrow-down" />
        </span>
      </ComboboxButton>
    </div>
    <ComboboxOptions
      class="max-h-[10.5rem] overflow-y-scroll bg-base-content-100 rounded border border-base-300 mt-1 overflow-hidden"
    >
      <ComboboxOption
        v-for="category in filteredCategories"
        :key="category.value"
        :value="category"
        class="border-b border-base-300 last:border-none cursor-pointer hover:bg-primary/30 transition"
        v-slot="{ selected }"
      >
        <li
          :class="selected && 'bg-primary text-primary-content'"
          class="p-2 w-auto text-base-content"
        >
          {{ category.label }}
        </li>
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>
