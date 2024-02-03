<template>
    <div class="select-none inline-flex shrink-0">
        <svg :style="`height: ${size}px; width: ${size}px; transform: scale(2.5);`">
            <use :href="`${Icons}#${name}`" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import Icons from '@/assets/icons.svg';
import type { IconEnum } from '@/enums/IconEnum';

defineProps<{
    size: string;
    name: IconEnum;
}>();
</script>
