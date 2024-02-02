<template>
    <svg class="inline-flex animate-loader-circular-rotate" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="loader-circular-shape" cx="33" cy="33" r="20" fill="none" :stroke-width="width" stroke-miterlimit="10" />
    </svg>
</template>

<script setup lang="ts">
import type { LoaderPropsInterface } from '@/interfaces/loader/LoaderPropsInterface';

withDefaults(defineProps<LoaderPropsInterface>(), {
    size: '7',
    width: '5'
});
</script>
