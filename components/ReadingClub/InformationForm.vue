<script setup lang="ts">
interface Props {
  image?: string;
  name?: string;
  description?: string;
  is_private?: boolean;
  submitLabel?: string;
}

withDefaults(defineProps<Props>(), {
  image: "",
  name: "",
  description: "",
  is_private: true,
});

defineEmits(["onSubmit"]);
</script>

<template>
  <GothamForm
    :submitLabel="submitLabel || $t('forms.create')"
    @submit="(values) => $emit('onSubmit', values)"
  >
    <FormKit
      name="image"
      :label="$t('forms.clubImage')"
      :help="$t('forms.clubImageHelp')"
      :value="image"
    />
    <FormKit
      name="name"
      :label="$t('forms.title')"
      validation="required"
      :value="name"
    />
    <FormKit
      name="description"
      type="textarea"
      :label="$t('forms.description')"
      :value="description"
    />
    <FormKit
      type="toggle"
      name="is_private"
      :label="$t('forms.privateClub')"
      :value="is_private"
      :help="$t('forms.privateClubHelp')"
    />
  </GothamForm>
</template>
