<template>
    <Teleport to="body">
        <Transition :name="TransitionEnum.MODAL_POPUP" mode="out-in">
            <div class="will-change-transform fixed flex flex-col gap-7 p-5 rounded-2xl shadow-xl bg-container border border-subtitle/5 shadow-lg top-[50vh] min-w-[250px] left-[50vw] translate-x-[-50%] translate-y-[-50%] w-[80%] max-w-[800px] z-modal" v-if="isOpened">
                <div class="flex justify-between gap-7">
                    <h2 class="text-2xl text-title font-semibold break-word hyphens-auto"><slot name="title" /></h2>
                    <AppTooltip text="Close" position="top">
                        <div class="flex items-center justify-center bg-background text-title p-[13px] rounded-xl transition duration-200 cursor-pointer border-2 border-background hover:border-subtitle/5 hover:bg-background/80" @click="closeModal">
                            <AppIcon :name="IconEnum.CLOSE" size="11" />
                        </div>
                    </AppTooltip>
                </div>
                <slot name="content" />
            </div>
        </Transition>
        <Transition :name="TransitionEnum.MODAL_OVERLAY_FADE" mode="out-in">
            <div class="fixed cursor-pointer top-0 bottom-0 left-0 right-0 w-full bg-[#070b0e]/70 backdrop-blur-sm z-modal-overlay" v-if="isOpened" @click="closeModal"></div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import AppTooltip from '@/components/AppTooltip.vue';
import { TransitionEnum } from '@/enums/TransitionEnum';
import AppIcon from '@/components/AppIcon.vue';
import { onMounted, onUnmounted, watch } from 'vue';

const isOpened = defineModel<boolean>();

watch(isOpened, () => {
    if (isOpened.value) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
});

const closeModal = (): void => {
    isOpened.value = false;
};

const escapeCloseModal = (e: KeyboardEvent): void => {
    if (e.code !== 'Escape' || !isOpened.value) return;
    closeModal();
};

onMounted(() => {
    document.addEventListener('keyup', escapeCloseModal);
});
onUnmounted(() => {
    document.removeEventListener('keyup', escapeCloseModal);
});
</script>
