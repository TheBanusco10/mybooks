<script setup lang="ts">
import { useBooksStore } from "~/stores/books";
import { format } from "@formkit/tempo";

const { getBookById } = useBooksStore();
const route = useRoute();

const { data: book, pending } = await useLazyAsyncData(() =>
  getBookById(Number(route.params.id)),
);

const { t } = useI18n();

const { getBookStatus, getStatusBackgroundColor } = useBookStatus();
const { getBookType, getTypeIcon } = useBookType();

const bookMetaInfo = computed(() => [
  {
    icon: "mdi:star-outline",
    value: `${book.value!.score}`,
  },
  {
    icon: "mdi:book-open-page-variant-outline",
    value: t("app.totalPages", { count: book.value!.number_pages }),
  },
  {
    icon: getTypeIcon(book.value!.type || ""),
    value: getBookType(book.value!.type || "").label,
  },
  {
    icon: "mdi:book-check-outline",
    value: book.value!.end_date
      ? format(book.value!.end_date || "", { date: "medium" })
      : null,
  },
]);

watch(pending, () => {
  useHead({
    title: book.value?.title || "Libro no encontrado",
  });
});
</script>

<template>
  <div>
    <GothamContainer>
      <div v-if="!pending && book" class="flex flex-col lg:flex-row gap-4">
        <section class="flex-[10%]">
          <div class="w-40 mx-auto relative">
            <NuxtImg
              :src="book?.image_url || ''"
              width="160px"
              height="256px"
              class="object-cover rounded shadow w-40 h-64 mx-auto lg:ml-auto"
              fetchpriority="high"
            />
            <BooksCoverInformation
              :status="book?.status!"
              :type="book?.type!"
            />
            <BooksCoverActions :id="book?.id!" :title="book?.title!" />
          </div>
          <p class="text-base-content text-center italic">
            {{ book?.author }}
          </p>
          <div class="flex flex-col gap-2">
            <BooksCategoryBadgesList
              :categories="book?.categories || []"
              span-classes="badge-outline"
              class="mt-2"
            />
            <ul class="flex flex-row flex-wrap lg:flex-col gap-2">
              <li class="flex gap-2 items-center text-sm">
                <div
                  class="w-4 rounded-full h-1"
                  :class="getStatusBackgroundColor(book?.status || '')"
                ></div>
                <span>{{ getBookStatus(book?.status || "").label }}</span>
              </li>
              <template v-for="{ icon, value } in bookMetaInfo">
                <li
                  v-if="value"
                  class="flex gap-2 items-center text-sm grow justify-center lg:justify-start"
                >
                  <Icon :name="icon" size="16px" />
                  <span>{{ value }}</span>
                </li>
              </template>
            </ul>
          </div>
        </section>
        <section class="flex-[90%] text-base-content">
          <h1 class="text-2xl md:text-3xl font-bold">{{ book?.title }}</h1>
          <div class="divider"></div>
          <p>
            {{ book?.description }}
          </p>
        </section>
      </div>
      <div v-if="pending" class="flex flex-col lg:flex-row gap-4">
        <section class="flex-[10%]">
          <div class="w-40 mx-auto relative mb-4">
            <article class="skeleton w-36 h-52"></article>
          </div>
          <span class="skeleton skeleton-text"
            >Cargando información adicional</span
          >
        </section>
        <section class="flex-[90%] text-base-content">
          <h1 class="skeleton skeleton-text text-2xl md:text-3xl font-bold">
            Cargando título del libro
          </h1>
          <div class="divider"></div>
          <span class="skeleton skeleton-text"
            >Cargando descripción del libro</span
          >
        </section>
      </div>
      <div v-if="!book">
        <p>No hemos encontrado el libro que busca</p>
      </div>
    </GothamContainer>
  </div>
</template>
