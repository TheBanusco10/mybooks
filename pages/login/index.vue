<script setup lang="ts">
useHead({
  title: "Iniciar sesión",
});

const user = useSupabaseUser();

if (user.value) {
  navigateTo("/");
}

const showSignInForm = ref(true);
</script>

<template>
  <main>
    <GothamContainer class="w-full lg:w-1/3 !px-4 py-2 shadow-lg rounded">
      <p
        class="inline-block text-2xl relative pb-1 before:w-2/3 before:absolute before:bottom-0 before:left-0 before:h-1 before:bg-slate-500 before:rounded-full"
      >
        MyBooks
      </p>
      <AuthSignInForm
        v-if="showSignInForm"
        @onChangeFormType="showSignInForm = false"
      />
      <AuthSignUpForm v-else @onChangeFormType="showSignInForm = true" />
    </GothamContainer>
  </main>
</template>
