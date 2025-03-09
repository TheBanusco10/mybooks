<script setup lang="ts">
import { useBooksStore } from "~/stores/books";
import { format } from "@formkit/tempo";

const { getBookById } = useBooksStore();
const route = useRoute();

const { data: book } = await useAsyncData(() =>
  getBookById(Number(route.params.id))
);

if (!book.value) {
  throw createError({
    statusCode: 404,
    message: "not found",
    fatal: true,
  });
}

useHead({
  title: book.value.title || "",
});

const { getBookStatus, getStatusBackgroundColor } = useBookStatus();
const { getBookType, getTypeIcon } = useBookType();

const bookMetaInfo = [
  {
    icon: "mdi:star-outline",
    value: `${book.value.score}`,
  },
  {
    icon: "mdi:book-open-page-variant-outline",
    value: `${book.value.number_pages} páginas`,
  },
  {
    icon: getTypeIcon(book.value.type || ""),
    value: getBookType(book.value.type || "").label,
  },
  {
    icon: "mdi:book-check-outline",
    value: book.value.end_date
      ? format(book.value.end_date || "", { date: "medium" })
      : null,
  },
];
</script>

<template>
  <div>
    <GothamContainer class="flex flex-col lg:flex-row gap-4">
      <section class="flex-[10%]">
        <div class="w-40 mx-auto relative">
          <NuxtImg
            :src="book?.image_url || ''"
            width="160px"
            height="256px"
            class="object-cover rounded shadow w-40 h-64 mx-auto lg:ml-auto"
            fetchpriority="high"
          />
          <BooksCoverInformation :status="book?.status!" :type="book?.type!" />
          <BooksCoverActions :id="book?.id!" :title="book?.title!" />
        </div>
        <p class="text-gray-500 text-center italic">
          {{ book?.author }}
        </p>
        <div class="flex flex-col gap-2">
          <BooksCategoryBadgesList
            :categories="book?.categories || []"
            span-classes="badge-primary badge-outline"
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
      <section class="flex-[90%]">
        <h1 class="text-2xl md:text-3xl font-bold">{{ book?.title }}</h1>
        <div class="divider"></div>
        <p class="text-gray-700">
          {{ book?.description }}
        </p>
      </section>
    </GothamContainer>
  </div>
</template>
