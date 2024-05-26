<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { signIn } = useAuthStore();
</script>

<template>
  <FormKit type="form" submit-label="Iniciar sesión" @submit="signIn">
    <FormKit
      type="text"
      name="email"
      label="Email"
      validation="required|email"
    />
    <FormKit
      type="password"
      name="password"
      label="Contraseña"
      validation="required"
    />
  </FormKit>
</template>
