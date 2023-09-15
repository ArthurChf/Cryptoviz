<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
        <AppIcon :name="IconEnum.STATUS_SUCCESS" class="h-7 w-7 fill-teal-500" />
        <AppIcon :name="IconEnum.STATUS_ERROR" class="h-7 w-7 fill-red-500" />
        <AppIcon :name="IconEnum.STATUS_NEUTRAL" class="h-7 w-7 fill-slate-500" />
        <AppIcon :name="IconEnum.ADD" class="h-7 w-7 fill-neutral-500" />
        <AppIcon :name="IconEnum.MORE" class="h-7 w-7 fill-neutral-500" />
    </div>
</template>

<script setup lang="ts">
import AppIcon from '@components/AppIcon.vue';
import { IconEnum } from '@enums/IconEnum';
</script>
