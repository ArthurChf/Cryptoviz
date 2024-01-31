<template>
    <div class="flex gap-6 w-full p-10">
        <div class="w-9/12 flex flex-col gap-6">
            <OverviewCard />
            <PriceTrendCard />
            <AppContainer>3</AppContainer>
        </div>
        <div class="flex flex-col gap-6 flex-1">
            <AppContainer>1</AppContainer>
            <AppContainer>2</AppContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import OverviewCard from '@/components/dashboard/OverviewCard.vue';
import PriceTrendCard from '@/components/dashboard/PriceTrendCard.vue';
</script>