<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import type { UserCredentials } from "~/types/auth";

defineEmits(["onChangeFormType"]);

const { signUp } = useAuthStore();

const handleSignUp = async (values: UserCredentials) => {
  try {
    await signUp(values);
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <div>
    <FormKit type="form" submit-label="Registrarse" @submit="handleSignUp">
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
        label="Contraseña"
        help="Introduce una contraseña"
        validation="required|length:8,22"
        autocomplete="new-password"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirma la contraseña"
        help="Introduce de nuevo tu contraseña"
        validation="required|confirm|length:8,22"
        autocomplete="new-password"
      />
      <FormKit
        type="url"
        name="imageUrl"
        label="Imagen de perfil"
        help="Introduce una URL válida para la imagen de perfil"
        validation="url"
      />
      <FormKit
        type="text"
        name="username"
        label="Nombre de usuario"
        help="Se mostrará públicamente para que puedas ser reconocido por otros usuarios"
        validation="required|length:5,15"
      />
    </FormKit>
    <p>
      ¿Ya eres miembro?
      <button class="btn btn-link" @click="$emit('onChangeFormType')">
        Iniciar sesión
      </button>
    </p>
  </div>
</template>
