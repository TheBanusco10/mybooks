<script setup lang="ts">
useHead({
  title: "Iniciar sesión",
});

const user = useSupabaseUser();

if (user.value) {
  navigateTo("/");
}
</script>

<template>
  <main>
    <GothamContainer>
      <AuthSignInForm />
    </GothamContainer>
  </main>
</template>
