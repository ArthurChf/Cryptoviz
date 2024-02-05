<template>
    <div class="group relative inline-block w-fit h-fit">
        <slot />
        <span v-show="show" class="z-tooltip animate-tooltip hidden absolute pointer-events-none text-title text-center py-2 px-3 rounded-lg bg-background border-2 border-subtitle/5 shadow-xl w-max group-hover:inline-flex" :class="`tooltip--${position}`">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    text: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    show?: boolean;
}>(), {
    show: true
});

const translateProperty = computed(() => {
    if (props.position === 'top') return 'translate(-50%, -100%)';
    else if (props.position === 'right') return 'translate(100%, -50%)';
    else if (props.position === 'bottom') return 'translate(-50%, 100%)';
    return 'translate(-100%, -50%)';
});
const transformOriginProperty = computed(() => {
    if (props.position === 'top') return 'left';
    else if (props.position === 'right') return 'right';
    else if (props.position === 'bottom') return '0';
    return 'left';
});
</script>

<style scoped lang="css">
.tooltip--top {
    top: -10px;
    left: 50%;
}
.tooltip--right {
    right: -10px;
    top: 50%;
}
.tooltip--bottom {
    bottom: -10px;
    left: 50%;
}
.tooltip--left {
    left: -10px;
    top: 50%;
}

.animate-tooltip {
    transform-origin: v-bind(transformOriginProperty);
    transform: scale(1) translate(-50%, 100%);
    will-change: transform, opacity;
    animation: animation-tooltip 0.3s forwards ease-in-out;
}

@keyframes animation-tooltip {
    0% {
        opacity: 0;
        transform-origin: v-bind(transformOriginProperty);
        transform: scale(0.97) v-bind(translateProperty);
    }
    40% {
        opacity: 1;
        transform-origin: v-bind(transformOriginProperty);
        transform: scale(1.03) v-bind(translateProperty);
    }
    100% {
        opacity: 1;
        transform-origin: v-bind(transformOriginProperty);
        transform: scale(1) v-bind(translateProperty);
    }
}
</style>
