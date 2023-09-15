<script setup lang="ts">
import BaseIcons from '@assets/icons/base.svg';

defineProps<{
    name: string;
}>();
</script>

<template>
    <svg class="inline-flex">
        <use :href="`${BaseIcons}#${name}`" />
    </svg>
</template>
