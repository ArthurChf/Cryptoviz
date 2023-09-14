<template>
    <main>
        <component :is="$route.meta.layout">
            <RouterView />
        </component>
    </main>
</template>
