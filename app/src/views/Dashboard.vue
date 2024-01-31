<template>
    <div class="flex gap-6 w-full p-10">
        <div class="w-9/12 flex flex-col gap-6">
            <AppContainer>
                <div class="group cursor-pointer inline-flex w-fit items-center">
                    <div class="flex items-center gap-3">
                        <h1 class="text-title font-bold text-2xl group-hover:text-title/80 transition duration-200">Bitcoin</h1>
                        <span class="text-subtitle text-sm font-medium mt-1 group-hover:text-subtitle/80 transition duration-200">BTC</span>
                    </div>
                    <AppIcon :name="IconEnum.ARROW_DOWN" size="32" color="text-title/90 group-hover:text-title/70 transition duration-200" />
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-subtitle text-4xl font-semibold">1,077.83 €</span>
                    <span class="flex items-center gap-1 border border-1 rounded-2xl border-active text-active font-bold text-sm px-2 py-1 mt-1"><AppIcon size="17" :name="IconEnum.ARROW_RIGHT_UP" /> 1,47 %</span>
                </div>
            </AppContainer>
            <AppContainer>2</AppContainer>
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
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';


</script>