<script setup lang="ts">
import type { SearchProfilesResults } from '~/types/profiles';

interface Props {
    profiles: SearchProfilesResults;
}

defineProps<Props>();
</script>

<template>
    <GothamCarousel>
        <GothamCarouselItem v-for="profile in profiles" :key="profile.username">
            <DiscoverProfilesItem :profile="profile" />
        </GothamCarouselItem>
    </GothamCarousel>
</template>