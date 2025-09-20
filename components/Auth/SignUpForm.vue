<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import type { UserCredentials } from "~/types/auth";

defineEmits(["onChangeFormType"]);

const { t, locale: currentLocale } = useI18n();

const { signUp } = useAuthStore();

const { currentTheme } = useTheme(t);

const handleSignUp = async (values: UserCredentials) => {
  try {
    values.locale = currentLocale.value;
    values.theme = currentTheme.value;
    await signUp(values);
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      :submit-label="t('forms.signUp')"
      @submit="handleSignUp"
    >
      <FormKit
        type="text"
        name="email"
        :label="t('forms.email')"
        validation="required|email"
        autocomplete="email"
      />
      <FormKit
        type="password"
        name="password"
        :label="t('forms.password')"
        :help="t('forms.enterPassword')"
        validation="required|length:8,22"
        autocomplete="new-password"
      />
      <FormKit
        type="password"
        name="password_confirm"
        :label="t('forms.confirmPassword')"
        :help="t('forms.reenterPassword')"
        validation="required|confirm|length:8,22"
        autocomplete="new-password"
      />
      <FormKit
        type="url"
        name="imageUrl"
        :label="t('forms.profileImage')"
        :help="t('forms.enterValidImageURL')"
        validation="url"
      />
      <FormKit
        type="text"
        name="username"
        :label="t('forms.username')"
        :help="t('forms.publicInfo')"
        validation="required|length:5,15"
      />
    </FormKit>
    <p>
      {{ t("forms.alreadyMember") }}
      <button class="btn btn-link" @click="$emit('onChangeFormType')">
        {{ t("forms.login") }}
      </button>
    </p>
  </div>
</template>
