<script setup lang="ts">
import type { ProfilesError } from "~/errors/profiles";
import type { SearchProfilesResults } from "~/types/profiles";

const { searchProfiles } = useProfilesStore();

const searchedProfileInput = ref("");
const profilesResult = ref<SearchProfilesResults | null>(null);
const isLoading = ref(false);

const handleSearchProfiles = useDebounce(async () => {
  try {
    if (searchedProfileInput.value.length < 2) {
      profilesResult.value = null;

      return;
    }

    isLoading.value = true;

    profilesResult.value = await searchProfiles({
      username: searchedProfileInput.value,
    });
  } catch (err: any) {
    const error: ProfilesError = err;

    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
}, 500);

watch(searchedProfileInput, handleSearchProfiles);
</script>

<template>
  <section>
    <GothamSearchInput
      v-model="searchedProfileInput"
      :placeholder="$t('app.searchByUsername')"
    />
    <GothamLoading v-if="isLoading" size="lg" class="block mx-auto" />
    <DiscoverProfilesList
      v-else-if="profilesResult"
      :profiles="profilesResult"
    />
  </section>
</template>
