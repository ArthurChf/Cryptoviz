<template>
    <AppContainer class="gap-9">
        <h2 class="text-2xl text-title font-bold">Recent Activities</h2>
        <RecentActivitiesTable v-if="selectedCurrency.name && !isUpdatingConfig" />
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import RecentActivitiesTable from '@/components/dashboard/RecentActivitiesTable.vue';
import AppLoader from '@/components/AppLoader.vue';
import { useAppStore } from '@/stores/appStore';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const appStore = useAppStore();
const { isUpdatingConfig } = storeToRefs(appStore);
</script>
