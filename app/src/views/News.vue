<template>
    <div class="flex w-full gap-6">
        <div class="w-7/12 ml-10 my-10">
            <NewsFeed />
        </div>
        <div class="sticky top-10 h-fit">
            Right
        </div>
    </div>
</template>

<script setup lang="ts">
import NewsFeed from '@/components/news/NewsFeed.vue';
</script>
