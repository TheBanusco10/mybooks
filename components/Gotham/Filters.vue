<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useFiltersStore } from "~/stores/filters";
import {
  FILTER_AUTHOR_ID,
  FILTER_CATEGORIES_ID,
  FILTER_SCORE_ID,
  FILTER_STATUS_ID,
  FILTER_TYPE_ID,
  type FilterKey,
  type FiltersFormData,
} from "~/types/filters";
import FiltersCategories from "~/components/Filters/Categories.vue";
import FiltersScore from "~/components/Filters/Score.vue";
import FiltersStatus from "~/components/Filters/Status.vue";
import FiltersType from "~/components/Filters/Type.vue";
import FiltersAuthor from "~/components/Filters/Author.vue";
import { FILTERS_FORM_ID } from "~/constants/filters";

const filtersStore = useFiltersStore();
const { filterBooks, resetFilteredBooks } = filtersStore;
const { selectedFilters, filtersFormData, appliedFiltersLabels } =
  storeToRefs(filtersStore);

const { getFilterLabel } = useBookFilters();

const filters = computed(() => [
  {
    id: FILTER_CATEGORIES_ID,
    name: getFilterLabel(FILTER_CATEGORIES_ID),
    component: FiltersCategories,
  },
  {
    id: FILTER_SCORE_ID,
    name: getFilterLabel(FILTER_SCORE_ID),
    component: FiltersScore,
  },
  {
    id: FILTER_STATUS_ID,
    name: getFilterLabel(FILTER_STATUS_ID),
    component: FiltersStatus,
  },
  {
    id: FILTER_TYPE_ID,
    name: getFilterLabel(FILTER_TYPE_ID),
    component: FiltersType,
  },
  {
    id: FILTER_AUTHOR_ID,
    name: getFilterLabel(FILTER_AUTHOR_ID),
    component: FiltersAuthor,
  },
]);

const mobileFiltersOpen = ref(false);

const handleResetFilters = () => {
  resetFilteredBooks(FILTERS_FORM_ID);
};

const handleFilterBook = async (values: FiltersFormData) => {
  try {
    const { getRange } = usePagination();
    const { from, to } = getRange(DEFAULT_PAGE);

    filtersFormData.value = values;

    await filterBooks(from, to);

    mobileFiltersOpen.value = false;
  } catch (err: any) {
    console.error(err.message);
  }
};

const { FILTERS } = useBookFilters();
const route = useRoute();
const queryParams = route.query;

useEach(queryParams, (value: any, key) => {
  if (FILTERS[key]) {
    const filterKey: FilterKey = key as FilterKey;
    const filterValue = value.split("|");
    selectedFilters.value[filterKey] = filterValue;
  }
});

if (!isEmpty(selectedFilters.value)) {
  await useAsyncData(() =>
    handleFilterBook(selectedFilters.value).then(() => true),
  );
}
</script>

<template>
  <section>
    <button
      type="button"
      class="btn text-gray-600 btn-outline btn-circle btn-sm p-2 sm:ml-6"
      @click="mobileFiltersOpen = true"
    >
      <span class="sr-only">Filtros</span>
      <Icon name="mdi:filter" aria-hidden="true" />
    </button>
    <button
      v-if="appliedFiltersLabels.length"
      class="btn btn-sm btn-link"
      @click="handleResetFilters"
    >
      Limpiar filtros
    </button>
  </section>
  <TransitionRoot as="template" :show="mobileFiltersOpen" :unmount="false">
    <Dialog
      class="relative z-40"
      @close="mobileFiltersOpen = false"
      :unmount="false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
        :unmount="false"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
          :unmount="false"
        >
          <DialogPanel
            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
          >
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">Filtros</h2>
              <button
                type="button"
                class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                @click="mobileFiltersOpen = false"
              >
                <span class="sr-only">Cerrar menú</span>
                <Icon name="mdi:close" />
              </button>
            </div>

            <!-- Filters -->
            <FormKit
              id="filters-form"
              type="form"
              :actions="false"
              class="mt-4 border-t border-gray-200"
              @submit="handleFilterBook"
            >
              <Disclosure
                as="div"
                v-for="section in filters"
                :key="section.id"
                class="border-t border-gray-200 px-4 py-6"
                v-slot="{ open }"
              >
                <h3 class="-mx-2 -my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                  >
                    <span class="font-medium text-gray-900">{{
                      section.name
                    }}</span>
                    <span class="ml-6 flex items-center">
                      <Icon
                        v-if="!open"
                        name="mdi:plus"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                      <Icon
                        v-else
                        name="mdi:minus"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel :unmount="false">
                  <div class="space-y-6">
                    <component
                      :is="section.component"
                      v-bind="{
                        id: section.id,
                        defaultValues: section.defaultValues,
                      }"
                    />
                  </div>
                </DisclosurePanel>
              </Disclosure>
              <FormKit
                type="submit"
                label="Aplicar filtros"
                outer-class="px-4"
              />
            </FormKit>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
