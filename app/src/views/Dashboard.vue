<template>
    <div class="flex gap-[24px] w-full p-[40px]">
        <div class="flex flex-col gap-[24px]" style="width: calc(100vw - 712px);">
            <OverviewCard />
            <PriceTrendCard />
            <RecentActivitiesCard />
        </div>
        <div class="flex flex-col gap-[24px]" style="width: 350px;">
            <FearGreedCard />
            <AppContainer>2</AppContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import FearGreedCard from '@/components/dashboard/FearGreedCard.vue';
import OverviewCard from '@/components/dashboard/OverviewCard.vue';
import PriceTrendCard from '@/components/dashboard/PriceTrendCard.vue';
import RecentActivitiesCard from '@/components/dashboard/RecentActivitiesCard.vue';
</script>
