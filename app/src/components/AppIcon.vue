<template>
    <svg class="select-none inline-flex shrink-0" :style="`height: ${size}px; width: ${size}px`">
        <use :href="`${Icons}#${name}`" />
    </svg>
</template>

<script setup lang="ts">
import Icons from '@/assets/icons.svg';
import type { IconEnum } from '@/enums/IconEnum';

defineProps<{
    size: string;
    name: IconEnum;
}>();
</script>
