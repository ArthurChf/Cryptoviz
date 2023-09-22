<template>
    <div class="layout bg-slate-900 flex flex-col lg:flex-row">
        <div class="flex flex-col flex-grow border-slate-800 border-2">
            <AppNavbar />
            <slot name="left" />
        </div>
        <div class="flex flex-col lg:w-1/4 overflow-y-auto scrollbar">
            <slot name="right" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AppNavbar from '@components/AppNavbar.vue';
</script>
