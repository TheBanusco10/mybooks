<script setup lang="ts">
import type { Category } from "~/types/category";
import { FormKitMessages } from "@formkit/vue";
import { getNode } from "@formkit/core";
import type { Row } from "~/interfaces/database";
import { useBooksStore } from "~/stores/books";

interface Props {
  cover?: string;
  title?: string;
  author?: string;
  description?: string;
}

const props = defineProps<Props>();

const { types } = useBookType();
const { statuses } = useBookStatus();

const selectedCategories = ref<Category[]>([]);

const previewImage = ref<string>("images/no-cover.svg");
const { addBook } = useBooksStore();

const handleImagePreviewInput = () => {
  const imagePreviewInput = getNode("image_url");

  if (!imagePreviewInput) return;

  imagePreviewInput.on(
    "input",
    async ({ payload: image_value }: { payload: string }) => {
      if (isEmpty(image_value)) return;

      previewImage.value = image_value;
    }
  );
};

const handleAddBook = async (values: Exclude<Row<"books">, "id">) => {
  try {
    values.categories = selectedCategories.value.map(
      (category) => category.value
    );

    values = useOmitBy(values, isEmpty) as Exclude<Row<"books">, "id">;

    await addBook(values);

    await navigateTo("/");
  } catch (err: any) {
    console.error(err.message);
  }
};

onMounted(() => {
  handleImagePreviewInput();

  if (props.cover) {
    previewImage.value = props.cover;
  }
});
</script>

<template>
  <FormKit
    type="form"
    form-class="flex flex-col md:flex-row gap-4 md:gap-10 justify-center mt-4"
    :actions="false"
    #default="{ disabled }"
    @submit="handleAddBook"
  >
    <div>
      <NuxtImg
        class="w-40 h-60 object-cover rounded shadow mx-auto bg-gray-50"
        :src="previewImage"
        alt="Preview de imagen"
        width="160px"
        height="240px"
      />
      <FormKit
        type="url"
        id="image_url"
        name="image_url"
        label="Imagen"
        placeholder="https://imgur.com/my_image.jpg"
        validation="required|url"
        :value="cover || ''"
      />
    </div>
    <div>
      <FormKit
        type="text"
        name="title"
        label="Título"
        validation="required"
        :value="title || ''"
      />
      <FormKit
        type="text"
        name="author"
        label="Autor"
        validation="required"
        :value="author || ''"
      />
      <FormKit
        type="textarea"
        name="description"
        label="Descripción"
        validation="required"
        :value="description || ''"
      />
      <div class="flex flex-row gap-4 gap-y-0 flex-wrap">
        <FormKit
          type="number"
          name="score"
          label="Puntuación"
          validation="required|min:0|max:10|number"
          value="0"
          outer-class="grow"
        />
        <FormKit
          type="number"
          name="number_pages"
          label="Número de páginas"
          validation="required|min:0|max:10000|number"
          value="100"
          outer-class="grow"
        />
        <FormKit
          type="select"
          name="type"
          label="Formato del libro"
          validation="required"
          :options="types"
          outer-class="grow"
        />
        <FormKit
          type="select"
          name="status"
          label="Estado del libro"
          validation="required"
          :options="statuses"
          outer-class="grow"
        />
      </div>
      <FormKit
        type="date"
        name="end_date"
        validation="date"
        label="Fecha de finalización"
      />
      <GothamCategories
        @on-select-category="(categories) => (selectedCategories = categories)"
      />
      <FormKitMessages />
      <FormKit
        type="submit"
        :disabled="disabled as boolean"
        wrapper-class="text-end mt-8"
        >Añadir libro</FormKit
      >
    </div>
  </FormKit>
</template>
