import { onUnmounted, ref } from 'vue';

const observer = ref<IntersectionObserver>();

export const useLazyLoad = (element: HTMLElement | null, callback: () => void) => {
    if (!element) return;

    observer.value = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '0px',
            threshold: 0.1
        }
    );
    observer.value.observe(element!);

    onUnmounted(() => {
        observer.value?.unobserve(element!);
    });
};
