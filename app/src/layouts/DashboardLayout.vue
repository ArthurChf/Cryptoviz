<template>
    <div class="layout lg:h-full bg-slate-900 flex flex-col lg:flex-row">
        <div class="flex flex-col w-full h-full lg:w-9/12 border-slate-800 border-2">
            <AppNavbar />
            <slot name="left" />
        </div>
        <div class="flex flex-col w-full lg:w-3/12 overflow-y-auto scrollbar py-4">
            <slot name="right" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AppNavbar from '@components/AppNavbar.vue';
</script>
