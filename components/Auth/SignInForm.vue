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
    <FormKit type="form" submit-label="Iniciar sesión" @submit="handleSignIn">
      <FormKit
        type="text"
        name="email"
        label="Email"
        validation="required|email"
        autocomplete="email"
      />
      <FormKit
        type="password"
        name="password"
        label="Contraseña"
        validation="required|length:8,22"
        autocomplete="current-password"
      />
    </FormKit>
    <p>
      ¿No eres miembro?
      <button class="btn btn-link" @click="$emit('onChangeFormType')">
        Registrate
      </button>
    </p>
  </div>
</template>
