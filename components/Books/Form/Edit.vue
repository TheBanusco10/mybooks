<script setup lang="ts">
import type { Category } from "~/types/category";
import { FormKitMessages } from "@formkit/vue";
import { getNode } from "@formkit/core";
import type { Row } from "~/interfaces/database";
import { useBooksStore } from "~/stores/books";

interface Props {
  book: Row<"books">;
}

const props = defineProps<Props>();

const { types } = useBookType();
const { statuses } = useBookStatus();

const selectedCategories = ref<Category[]>([]);

const previewImage = ref<string>(
  props.book.image_url || "https://placehold.co/160x200"
);
const { updateBook } = useBooksStore();

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

const handleUpdateBook = async (values: Exclude<Row<"books">, "id">) => {
  try {
    values.categories = selectedCategories.value.map(
      (category) => category.value
    );

    await updateBook(props.book.id, values);

    await navigateTo(`/books/${props.book.id}`);
  } catch (err: any) {
    console.error(err.message);
  }
};

onMounted(() => {
  handleImagePreviewInput();
});
</script>

<template>
  <FormKit
    type="form"
    form-class="flex flex-col md:flex-row gap-4 md:gap0 justify-center mt-4"
    :actions="false"
    #default="{ disabled }"
    @submit="handleUpdateBook"
  >
    <div>
      <img
        class="w-40 h-auto object-cover rounded shadow mx-auto"
        :src="previewImage"
        alt="Preview de imagen"
      />
      <FormKit
        type="url"
        id="image_url"
        name="image_url"
        label="Imagen"
        placeholder="https://imgur.com/my_image.jpg"
        validation="required|url"
        :value="book.image_url || ''"
      />
    </div>
    <div>
      <FormKit
        type="text"
        name="title"
        label="Título"
        validation="required"
        :value="book.title || ''"
      />
      <FormKit
        type="text"
        name="author"
        label="Autor"
        validation="required"
        :value="book.author || ''"
      />
      <FormKit
        type="textarea"
        name="description"
        label="Descripción"
        validation="required"
        :value="book.description || ''"
      />
      <div class="flex flex-row gap-4 flex-wrap">
        <FormKit
          type="number"
          name="score"
          label="Puntuación"
          validation="required|min:0|max:10|number"
          :value="(book.score || 0).toString()"
          outer-class="grow"
        />
        <FormKit
          type="number"
          name="number_pages"
          label="Número de páginas"
          validation="required|min:0|max:10000|number"
          :value="(book.number_pages || 0).toString()"
          outer-class="grow"
        />
        <FormKit
          type="select"
          name="type"
          label="Formato del libro"
          validation="required"
          :options="types"
          :value="book.type || ''"
          outer-class="grow"
        />
        <FormKit
          type="select"
          name="status"
          label="Estado del libro"
          validation="required"
          :options="statuses"
          :value="book.status || ''"
          outer-class="grow"
        />
      </div>
      <GothamCategories
        @on-select-category="(categories) => (selectedCategories = categories)"
        :default-values="book.categories || []"
      />
      <FormKitMessages />
      <FormKit
        type="submit"
        :disabled="(disabled as boolean)"
        wrapper-class="text-end mt-8"
        >Editar libro</FormKit
      >
    </div>
  </FormKit>
</template>
