<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();

const route = useRoute();

const authStore = useAuthStore();
const { signOut } = authStore;
const { isUserLoggedIn } = storeToRefs(authStore);

const drawerToggleInput = ref<HTMLInputElement | null>(null);
const drawerToggleInputGlobaRef = useState<HTMLInputElement | null>(
  "drawerToggleInput",
  () => null
);

const config = useRuntimeConfig();

const mainMenuItems = computed(() => [
  {
    name: t("app.library"),
    href: "/",
    icon: "mdi:book-open-page-variant-outline",
  },
  {
    name: t("app.bookClubs"),
    href: "/reading-clubs",
    icon: "mdi:bookshelf",
  },
]);

const subMenuItems = computed(() => [
  {
    name: t("forms.login"),
    href: "/login",
    icon: "mdi:login",
    callback: null,
    show: !isUserLoggedIn.value,
  },
  {
    name: t("forms.logout"),
    href: "",
    icon: "mdi:logout",
    callback: signOut,
    show: isUserLoggedIn.value,
  },
]);

const profileMenuItems = computed(() => [
  {
    name: t("app.profile"),
    href: "/profile",
    icon: "mdi:account-outline",
  },
]);

onMounted(() => {
  drawerToggleInputGlobaRef.value = drawerToggleInput.value;
});
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input
      id="main-navigation"
      type="checkbox"
      class="drawer-toggle"
      ref="drawerToggleInput"
    />
    <div class="drawer-content flex flex-col items-center">
      <div class="w-full lg:hidden">
        <label
          for="main-navigation"
          class="btn btn-circle btn-ghost drawer-button"
        >
          <Icon name="mdi:menu" size="1.5rem" />
        </label>
      </div>
      <div id="main-content" class="w-full p-4">
        <slot />
      </div>
    </div>
    <div class="drawer-side z-[9999]">
      <label
        for="main-navigation"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>

      <div
        class="w-64 menu flex flex-col justify-between min-h-full px-3 py-4 overflow-y-auto bg-base-200"
      >
        <ul class="space-y-2 font-medium">
          <div v-if="isUserLoggedIn">
            <NavbarItem
              v-for="(item, index) in mainMenuItems"
              v-bind="{
                ...item,
                route: route.path,
              }"
              :key="index"
            />
          </div>
        </ul>
        <ul class="space-y-2 font-medium">
          <GothamLanguageSwitcher />
          <GothamThemeSwitcher />
          <div v-if="isUserLoggedIn">
            <NavbarItem
              v-for="(item, index) in profileMenuItems"
              v-bind="{
                ...item,
                route: route.path,
              }"
              :key="index"
            >
            </NavbarItem>
            <div class="divider"></div>
          </div>
          <div>
            <li
              v-for="{ name, href, icon, callback, show } in subMenuItems"
              class="bg-transparent"
            >
              <NuxtLink
                v-if="!callback && show"
                :to="href"
                class="w-full justify-start btn bg-primary text-primary-content hover:bg-primary/90 group transition-all"
              >
                <Icon :name="icon" />
                <span class="ms-3">
                  {{ name }}
                </span>
              </NuxtLink>
              <button
                v-else-if="callback && show"
                class="w-full justify-start btn btn-outline btn-sm group transition-all"
                @click="callback"
              >
                <Icon :name="icon" />
                <span class="ms-3">
                  {{ name }}
                </span>
              </button>
            </li>
            <p class="text-xs text-base-content/70 mt-2">
              v{{ config.public.appVersion }}
            </p>
          </div>
          <!-- Logo here -->
          <!-- <img
            src=""
            class="w-28 h-auto object-cover mx-auto py-2"
          /> -->
        </ul>
      </div>
    </div>
  </div>
</template>
