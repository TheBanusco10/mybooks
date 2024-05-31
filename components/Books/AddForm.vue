<template>
  <FormKit type="form" submit-label="Añadir libro" :actions="false">
    <FormKit
      type="url"
      name="image_url"
      label="Imagen"
      placeholder="https://imgur.com/my_image.jpg"
      validation="required|url"
    />
    <FormKit type="text" name="title" label="Título" validation="required" />
    <FormKit type="text" name="author" label="Autor" validation="required" />
    <FormKit
      type="textarea"
      name="description"
      label="Descripción"
      validation="required"
    />
  </FormKit>
</template>
