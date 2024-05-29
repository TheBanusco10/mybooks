<script setup lang="ts">
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
