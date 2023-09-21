<template>
    <div class="default-layout bg-slate-900 flex flex-col">
        <AppNavbar />
        <slot />
    </div>
</template>

<script setup lang="ts">
import AppNavbar from '@components/AppNavbar.vue';
</script>
