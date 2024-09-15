<script setup lang="ts">
interface Props {
  name: string;
  href: string;
  icon: string;
  route: string;
}

defineProps<Props>();
</script>

<template>
  <li>
    <NuxtLink
      :to="href"
      class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 outline-none focus:bg-gray-100 transition-all"
      :class="{ 'bg-gray-100': route === href }"
    >
      <Icon :name="icon" size="1.2rem" />
      <span class="ms-3">
        {{ name }}
      </span>
    </NuxtLink>
  </li>
</template>
