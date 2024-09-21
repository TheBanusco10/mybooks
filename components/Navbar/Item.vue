<script setup lang="ts">
interface Props {
  name: string;
  href: string;
  icon: string;
  route: string;
}

defineProps<Props>();

const drawerInput = useState<HTMLInputElement | null>(
  "drawerToggleInput",
  () => null,
);

const closeNavigationDrawer = () => {
  if (!drawerInput.value || !drawerInput.value.checked) return;

  drawerInput.value.checked = false;
};
</script>

<template>
  <li>
    <NuxtLink
      :to="href"
      class="navbar-item flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 outline-none focus:bg-gray-100 transition-all"
      :class="{ 'bg-gray-100': route === href }"
      @click="closeNavigationDrawer"
    >
      <Icon :name="icon" size="1.2rem" />
      <span class="ms-3">
        {{ name }}
      </span>
    </NuxtLink>
  </li>
</template>
