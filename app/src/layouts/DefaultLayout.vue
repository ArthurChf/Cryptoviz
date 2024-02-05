<template>
    <div class="bg-background flex min-h-screen">
        <AppSidebar />
        <RouterView #default="{ Component }">
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <KeepAlive>
                    <component :is="Component" />
                </KeepAlive>
            </Transition>
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { TransitionEnum } from '@/enums/TransitionEnum';
</script>
