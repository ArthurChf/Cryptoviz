import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: [
            { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
            { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
            { find: '@composables', replacement: fileURLToPath(new URL('./src/composables', import.meta.url)) },
            { find: '@enums', replacement: fileURLToPath(new URL('./src/enums', import.meta.url)) },
            { find: '@layouts', replacement: fileURLToPath(new URL('./src/layouts', import.meta.url)) },
            { find: '@router', replacement: fileURLToPath(new URL('./src/router', import.meta.url)) },
            { find: '@types', replacement: fileURLToPath(new URL('./src/types', import.meta.url)) },
            { find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) }
        ]
    }
});
