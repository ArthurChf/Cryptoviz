<template>
    <div class="flex flex-col xl:flex-row gap-[24px] w-full p-[40px]">
        <div class="flex flex-col gap-[24px] w-full xl:w-[calc(100vw-712px)]">
            <OverviewCard />
            <PriceTrendCard />
            <RecentActivitiesCard />
        </div>
        <div class="flex flex-col gap-8 w-full xl:w-[350px]">
            <FearGreedCard />
            <NewsFeedCard />
        </div>
    </div>
</template>

<script setup lang="ts">
import NewsFeedCard from '@/components/dashboard/NewsFeedCard.vue';
import FearGreedCard from '@/components/dashboard/FearGreedCard.vue';
import OverviewCard from '@/components/dashboard/OverviewCard.vue';
import PriceTrendCard from '@/components/dashboard/PriceTrendCard.vue';
import RecentActivitiesCard from '@/components/dashboard/RecentActivitiesCard.vue';
</script>
