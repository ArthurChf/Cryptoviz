<template>
    <div class="flex items-center w-full rounded-xl transition duration-200 focus-within:bg-background/70 border focus-within:border-subtitle/5" :class="disabled ? 'text-subtitle/30 bg-background/20 border-background/80' : 'text-title bg-background border-background'">
        <AppIcon :name="IconEnum.SEARCH" size="9" class="ml-5" />
        <input type="text" ref="searchInputEl" :disabled="disabled" v-model="searchValue" class="ml-5 mr-3 outline-none bg-[transparent] w-full py-3" :placeholder="placeholder" :class="disabled ? 'placeholder:text-subtitle/30 text-subtitle/80' : 'placeholder:text-subtitle/70 text-title'" @keyup.enter="enter" />
        <Transition :name="TransitionEnum.FADE" mode="out-in">
            <AppTooltip v-if="searchValue.length && !loading" text="Clear" :position="tooltipPosition" @click="clearSearch">
                <div class="flex items-center justify-center bg-container p-2 mr-3 rounded-xl transition duration-200 cursor-pointer border-2 border-container hover:border-subtitle/5 hover:bg-container/80">
                    <AppIcon :name="IconEnum.CLOSE" size="9" />
                </div>
            </AppTooltip>
            <div v-else-if="loading" class="flex items-center justify-center mr-3">
                <AppLoader size="35" class="stroke-subtitle" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import { IconEnum } from '@/enums/IconEnum';
import type { TooltipPosition } from '@/types/TooltipPosition';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { computed, onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    placeholder?: string;
    autofocus?: boolean;
    disabled?: boolean;
    loading?: boolean;
    tooltipPosition?: TooltipPosition;
}>(), {
    placeholder: '',
    autofocus: false,
    disabled: false,
    loading: false,
    tooltipPosition: 'right'
});
const emit = defineEmits<{
    (e: 'change', val: string): void;
    (e: 'enter', val: string): void;
}>();

const searchValue = defineModel<string>({
    required: true
});
const searchInputEl = ref<HTMLElement>();
const focusInput = () => {
    searchInputEl.value?.focus();
};
const changeValue = () => {
    if (!props.disabled && !props.loading) emit('change', searchValue.value);
};
const clearSearch = () => {
    searchValue.value = '';
    focusInput();
};
const enter = () => {
    if (!props.disabled && !props.loading) emit('enter', searchValue.value);
};

const loading = computed(() => props.loading);

watch(searchValue, () => {
    changeValue();
});
watch(loading, () => {
    if (!loading.value) focusInput();
});
onMounted(() => {
    if (props.autofocus) focusInput();
});
</script>
