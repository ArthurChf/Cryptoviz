<template>
    <div class="flex gap-[24px] w-full p-[40px]">
        <div class="flex flex-col gap-[24px]" style="width: calc(100vw - 712px);">
            <OverviewCard />
            <PriceTrendCard />
            <RecentActivitiesCard />
        </div>
        <div class="flex flex-col gap-8" style="width: 350px;">
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
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';

const httpOptions: HttpOptions = {
    routeName: HttpRouteEnum.CRYPTO_GET_CURRENCY_DATA
};
const socketOptions: SocketOptions = {
    eventName: SocketEventEnum.CRYPTO_GET_CURRENCY_DATA
};
useFetchData(httpOptions, socketOptions, (data) => {
    console.log('get currency data');
    console.log(data);
});
</script>
