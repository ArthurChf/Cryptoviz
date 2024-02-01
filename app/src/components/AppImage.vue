<template>
    <img :src="imageSrc" :key="imageId" :id="imageId" :style="`width: ${size}px`" :class="{ loaded: !imageLoading }" @load="imageLoading = false" @loading="imageLoading = true" />
</template>

<script setup lang="ts">
import { useLazyLoad } from '@/composables/useLazyLoad';
import { useAppStore } from '@/stores/appStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    size: string;
    name: string;
}>();

const { displayedImagesCount } = storeToRefs(useAppStore());
const imageId = `img${displayedImagesCount.value}`;

const imageSrc = ref('');
const imageLoading = ref(true);

const loadImage = (path: string) => {
    imageSrc.value = new URL(`../assets/images/${path}`, import.meta.url).href;
};

onMounted(() => {
    useLazyLoad(document.getElementById(imageId), () => {
        loadImage(props.name);
    });
});
</script>

<style>
img {
    filter: blur(10px);
    transition: filter 0.3s ease;
}
img.loaded {
    filter: blur(0);
}
</style>
