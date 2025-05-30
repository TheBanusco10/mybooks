<script setup lang="ts">
import type { Category } from "~/types/category";
import { FormKitMessages } from "@formkit/vue";
import { getNode } from "@formkit/core";
import type { BookFormInformationType } from "~/types/books";
import type { ModalRef } from "~/types/modals";

interface Props {
  book?: BookFormInformationType;
  submitLabel?: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["onFormSubmit"]);

const { types, DEFAULT_BOOK_TYPE } = useBookType();
const { statuses, DEFAULT_STATUS, STATUS_FINISHED } = useBookStatus();
const { formatDateToInput } = useFormatter();

const selectedCategories = defineModel<Category[]>();

const bookStatusModalRef = ref<ModalRef>();

const previewImage = ref<string>(
  props.book?.image_url || "images/no-cover.svg",
);

const handleImagePreviewInput = () => {
  const imagePreviewInput = getNode("image_url");

  if (!imagePreviewInput) return;

  imagePreviewInput.on(
    "input",
    async ({ payload: image_value }: { payload: string }) => {
      if (isEmpty(image_value)) return;

      previewImage.value = image_value;
    },
  );
};

const handleBookStatusField = () => {
  const bookStatusField = getNode("status");

  if (!bookStatusField) return;

  bookStatusField.on(
    "input",
    ({ payload: status_value }: { payload: string }) => {
      if (isEmpty(status_value)) return;

      if (status_value !== STATUS_FINISHED) return;

      bookStatusModalRef.value?.dialogElement.showModal();
    },
  );
};

const setBookEndDateToToday = () => {
  const bookEndDate = getNode("end_date");

  if (!bookEndDate) return;

  bookEndDate.input(formatDateToInput(new Date()));
};

onMounted(() => {
  handleImagePreviewInput();
  handleBookStatusField();
});
</script>

<template>
  <FormKit
    type="form"
    form-class="flex flex-col md:flex-row gap-4 md:gap0 justify-center mt-4"
    :actions="false"
    #default="{ disabled }"
    @submit="$emit('onFormSubmit', $event)"
  >
    <div>
      <NuxtImg
        class="w-40 h-60 object-cover rounded shadow mx-auto bg-base-200/60 border border-base-content border-opacity-70"
        :src="previewImage"
        alt="Preview de imagen"
        width="160px"
        height="240px"
      />
      <FormKit
        type="url"
        id="image_url"
        name="image_url"
        :label="$t('forms.image')"
        placeholder="https://imgur.com/my_image.jpg"
        validation="required|url"
        :value="book?.image_url || ''"
      />
    </div>
    <div>
      <FormKit
        type="text"
        name="title"
        :label="$t('forms.title')"
        validation="required"
        :value="book?.title || ''"
      />
      <FormKit
        type="text"
        name="author"
        label="Autor"
        validation="required"
        :value="book?.author || ''"
      />
      <FormKit
        type="textarea"
        name="description"
        :label="$t('forms.description')"
        validation="required"
        :value="book?.description || ''"
      />
      <div class="flex flex-row gap-4 flex-wrap">
        <FormKit
          type="number"
          name="score"
          :label="$t('app.rating')"
          validation="required|min:0|max:10|number"
          :value="(book?.score || 0).toString()"
          outer-class="grow"
        />
        <FormKit
          type="number"
          name="number_pages"
          :label="$t('app.numberOfPages')"
          validation="required|min:0|max:10000|number"
          :value="(book?.number_pages || 0).toString()"
          outer-class="grow"
        />
        <FormKit
          type="select"
          name="type"
          :label="$t('app.bookType')"
          validation="required"
          :options="types"
          :value="book?.type || DEFAULT_BOOK_TYPE.value"
          outer-class="grow"
        />
        <FormKit
          type="select"
          id="status"
          name="status"
          :label="$t('app.bookStatus')"
          validation="required"
          :options="statuses"
          :value="book?.status || DEFAULT_STATUS"
          outer-class="grow"
        />
      </div>
      <FormKit
        type="date"
        id="end_date"
        name="end_date"
        validation="date"
        :label="$t('app.endDate')"
        :value="book?.end_date || ''"
      />
      <GothamCategories
        @on-select-category="(categories) => (selectedCategories = categories)"
        :default-values="book?.categories || []"
      />
      <FormKitMessages />
      <FormKit
        v-if="submitLabel"
        type="submit"
        :disabled="disabled as boolean"
        wrapper-class="text-end mt-8"
      >
        {{ submitLabel }}
      </FormKit>
    </div>
  </FormKit>
  <GothamModal id="book-status-modal" ref="bookStatusModalRef">
    <template v-slot:title> {{ $t("app.endDate") }} </template>
    <template v-slot:content> {{ $t("app.endDateMessage") }} </template>
    <template v-slot:action>
      <button class="btn btn-primary" @click="setBookEndDateToToday">
        {{ $t("forms.confirm") }}
      </button>
    </template>
  </GothamModal>
</template>
