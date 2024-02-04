<template>
    <div class="select-none inline-flex shrink-0">
        <svg :style="`height: ${size}px; width: ${size}px; transform: scale(2.5);`" class="transition duration-200" :class="iconLoading ? 'opacity-0' : 'opacity-100'">
            <use :href="`${Icons}#${name}`" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import Icons from '@/assets/icons.svg';
import type { IconEnum } from '@/enums/IconEnum';
import { nextTick, onMounted, ref } from 'vue';

defineProps<{
    size: string;
    name: IconEnum;
}>();
const iconLoading = ref(true);

onMounted(async () => {
    await nextTick();
    iconLoading.value = false;
});
</script>
