import type { ProfileFormsPersonalInformationImageUrlFields } from
'#build/components';
<script setup lang="ts">
import type { UsersError } from "~/errors/users";
import type { UserInformation } from "~/types/users";
import { reset } from "@formkit/core";

const { updateUserInformation } = useUsersStore();

const handleUpdateUserPersonalInformation = async (
  values: UserInformation,
  validateValues: boolean = true,
) => {
  try {
    let userInformation = values;

    if (validateValues) {
      userInformation = useOmitBy(userInformation, isEmpty);
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
    false,
  );
};
</script>

<template>
  <GothamForm
    submitLabel="Actualizar"
    @submit="handleUpdateUserPersonalInformation"
  >
    <ProfileFormsPersonalInformationImageUrlFields
      @on-remove-user-image="handleRemoveUserImage"
    />
  </GothamForm>
</template>
