<template>
    <div class="sticky top-0 w-full xl:h-screen z-sidebar shadow-lg bg-container py-6 flex shrink-0 flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0 xl:gap-11 xl:w-[252px] xl:flex-col xl:justify-start">
        <div class="flex items-center mx-9 gap-4 h-[51px]">
            <AppImage class="w-[45px]" name="logo.webp" />
            <span class="font-bold text-title text-2xl">CryptoViz</span>
        </div>
        <div class="flex flex-col sm:flex-row xl:flex-col items-center gap-2 xl:gap-3 mx-4">
            <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" class="group flex items-center gap-4 xl:gap-5 transition duration-200 hover:bg-background xl:w-full py-3 px-5 xl:py-4 xl:px-6 rounded-lg font-medium" :class="isCurrentRoute(link.to) ? 'bg-background' : 'bg-transparent'">
                <AppIcon class="transition duration-200" :class="isCurrentRoute(link.to) ? 'text-active/60' : 'text-title/80 group-hover:text-title/60'" size="11" :name="link.icon" />
                <span class="text-md transition duration-200" :class="isCurrentRoute(link.to) ? 'text-active' : 'text-title group-hover:text-title/80'">{{ link.name }}</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppImage from '@/components/AppImage.vue';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { useRouter } from 'vue-router';
import { RouteEnum } from '@/enums/RouteEnum';
import { ref } from 'vue';

const router = useRouter();
const isCurrentRoute = (route: string) => {
    return route === router.currentRoute.value.fullPath;
};

const navLinks = ref([
    {
        name: 'Dashboard',
        icon: IconEnum.DASHBOARD,
        to: RouteEnum.DASHBOARD
    },
    {
        name: 'Market Overview',
        icon: IconEnum.ANALYTICS,
        to: RouteEnum.MARKET
    },
    {
        name: 'News',
        icon: IconEnum.NEWS,
        to: RouteEnum.NEWS
    }
]);
</script>
