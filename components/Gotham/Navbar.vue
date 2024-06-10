<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const route = useRoute();

const authStore = useAuthStore();
const { signOut } = authStore;
const { isUserLoggedIn } = storeToRefs(authStore);

const mainMenuItems = computed(() => [
  {
    name: "Biblioteca",
    href: "/",
    icon: "mdi:book-open-page-variant-outline",
    show: isUserLoggedIn.value,
  },
]);

const subMenuItems = computed(() => [
  {
    name: "Iniciar sesión",
    href: "/login",
    icon: "mdi:login",
    callback: null,
    show: !isUserLoggedIn.value,
  },
  {
    name: "Cerrar sesión",
    href: "",
    icon: "mdi:logout",
    callback: signOut,
    show: isUserLoggedIn.value,
  },
]);

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <button
    data-drawer-target="main-navigation"
    data-drawer-toggle="main-navigation"
    aria-controls="main-navigation"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Abrir menú</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="main-navigation"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow"
    aria-label="Sidebar"
  >
    <div
      class="flex flex-col h-full px-3 py-4 overflow-y-auto justify-between bg-gray-200 dark:bg-gray-800"
    >
      <ul class="space-y-2 font-medium">
        <li v-for="{ name, href, icon, show } in mainMenuItems">
          <NuxtLink
            v-if="show"
            :to="href"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-all"
            :class="{ 'bg-gray-100 dark:bg-gray-700': route.path === href }"
          >
            <Icon :name="icon" />
            <span class="ms-3">
              {{ name }}
            </span>
          </NuxtLink>
        </li>
      </ul>
      <ul class="space-y-2 font-medium">
        <li v-for="{ name, href, icon, callback, show } in subMenuItems">
          <NuxtLink
            v-if="!callback && show"
            :to="href"
            class="w-full justify-start btn bg-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-all"
          >
            <Icon :name="icon" />
            <span class="ms-3">
              {{ name }}
            </span>
          </NuxtLink>
          <button
            v-else-if="callback && show"
            class="w-full justify-start btn btn-outline dark:text-white dark:hover:bg-gray-700 group transition-all"
            @click="callback"
          >
            <Icon :name="icon" />
            <span class="ms-3">
              {{ name }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <slot />
  </div>
</template>
