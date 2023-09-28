<template>
    <div>
        <input class="h-[40px] leading-none p-2 bg-inherit outline-none w-40 hover:bg-slate-900 transition duration-[200ms] text-sm" :placeholder="selectedItem.name" v-model="search" @input="updateSearchValue" />
        <Transition :name="TransitionEnum.FADE">
            <div v-if="search.length" class="select-none absolute top-[43.4px] left-[1.9px] w-40 flex flex-col rounded-b-md flex-nowrap overflow-x-auto scrollbar bg-slate-950 overflow-y-auto scrollbar max-h-32 text-sm">
                <span v-if="loading" class="py-3 px-2 flex justify-center">
                    <AppLoader size="9" :type="LoaderEnum.DOTS" color="bg-slate-600" />
                </span>
                <span v-else-if="items.length" class="flex justify-between items-center hover:bg-slate-800 transition duration-[200ms] cursor-pointer py-1 px-2" v-for="(item, id) in items" :class="[id === selectedItem.id ? 'bg-slate-800' : '']" :key="item.symbol" @click="selectItem(id, item.name)">
                    <span class="text-sm">{{ item.name }}</span>
                    <span class="text-[10px] font-bold text-slate-600">{{ item.symbol }}</span>
                </span>
                <span v-else class="flex justify-center">Aucun résultat</span>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { CurrencyType } from '@types/CurrencyType';
import AppLoader from '@components/AppLoader.vue';
import { reactive, ref } from 'vue';
import { LoaderEnum } from '@enums/loader/LoaderEnum';
import { TransitionEnum } from '@enums/TransitionEnum';

defineProps<{
    items: CurrencyType[];
    loading: boolean;
}>();

const emit = defineEmits<{
    (e: 'update', value: string): void;
}>();

const search = ref('');

const selectedItem = reactive({
    name: '-',
    id: -1
});

const selectItem = (id: number, name: string): void => {
    selectedItem.id = id;
    selectedItem.name = name;
};

const updateSearchValue = (): void => {
    emit('update', search.value);
};
</script>
