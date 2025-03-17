<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import type { UserCredentials } from "~/types/auth";

defineEmits(["onChangeFormType"]);

const { signIn } = useAuthStore();

const handleSignIn = async (values: UserCredentials) => {
  try {
    await signIn(values);
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      :submit-label="$t('forms.login')"
      @submit="handleSignIn"
    >
      <FormKit
        type="text"
        name="email"
        :label="$t('forms.email')"
        validation="required|email"
        autocomplete="email"
      />
      <FormKit
        type="password"
        name="password"
        :label="$t('forms.password')"
        validation="required|length:8,22"
        autocomplete="current-password"
      />
    </FormKit>
    <p>
      {{ $t("forms.notMember") }}
      <button class="btn btn-link" @click="$emit('onChangeFormType')">
        {{ $t("forms.signUp") }}
      </button>
    </p>
  </div>
</template>
