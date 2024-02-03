<template>
    <img v-if="name" :src="imageSrc" :key="imageId" :id="imageId" :style="`width: ${size}px; height: max-content;`" class="transition duration-200" :class="imageLoading ? 'opacity-0' : 'opacity-100'" @load="imageLoading = false" />
</template>

<script setup lang="ts">
import { useLazyLoad } from '@/composables/useLazyLoad';
import { useAppStore } from '@/stores/appStore';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    size: string;
    name: string;
}>();

const { displayedImagesCount } = storeToRefs(useAppStore());
const imageId = `img${displayedImagesCount.value++}`;

const imageSrc = ref('');
const imageLoading = ref(true);

const loadImage = (path: string) => {
    if (path.length) imageSrc.value = new URL(`../assets/images/${path}`, import.meta.url).href;
};
const { observe, unobserve } = useLazyLoad(() => {
    loadImage(props.name);
});

onMounted(() => {
    if (props.name) observe(document.getElementById(imageId));
});
onUnmounted(() => {
    if (props.name) unobserve(document.getElementById(imageId));
});
</script>
