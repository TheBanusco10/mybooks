<script setup lang="ts">
import type { UsersError } from "~/errors/users";
import type { UserInformation } from "~/types/users";
import { reset } from "@formkit/core";

const { updateUserInformation } = useUsersStore();

const user = useSupabaseUser();

const isProfilePrivate = computed(() => {
  return isUndefined(user.value?.user_metadata.is_private)
    ? true
    : user.value.user_metadata.is_private;
});

const handleUpdateUserPersonalInformation = async (
  values: UserInformation,
  validateValues: boolean = true
) => {
  try {
    let userInformation = values;

    if (validateValues) {
      const validation = useOverEvery([isString, isEmpty]);

      userInformation = useOmitBy(userInformation, validation);
    }

    await updateUserInformation(userInformation);

    reset("image_url");
  } catch (err: any) {
    const error: UsersError = err;

    console.error(error.message);
  }
};

const handleRemoveUserImage = async () => {
  await handleUpdateUserPersonalInformation(
    {
      image_url: "",
    },
    false
  );
};
</script>

<template>
  <ProfileFormsPersonalInformationRemoveUserImageAction
    @onRemoveUserImage="handleRemoveUserImage"
  />
  <GothamForm
    submitLabel="Actualizar"
    @submit="handleUpdateUserPersonalInformation"
  >
    <FormKit
      id="image_url"
      type="url"
      name="image_url"
      label="Imagen de perfil"
      help="Introduce una URL válida para la imagen de perfil"
      validation="url"
    />
    <FormKit
      id="username"
      type="text"
      name="username"
      label="Nombre de usuario"
      help="Se mostrará públicamente para que puedas ser reconocido por otros usuarios"
      validation="required|length:5,15"
      :value="user?.user_metadata.username || ''"
    />
    <FormKit
      id="is_private"
      type="toggle"
      name="is_private"
      label="Perfil privado"
      help="Permitirá que tu perfil sea encontrado por otros usuarios"
      validation="required"
      :value="isProfilePrivate"
    />
  </GothamForm>
</template>
