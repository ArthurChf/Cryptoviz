import { ref } from 'vue';

const observer = ref<IntersectionObserver | null>(null);

export const useLazyLoad = (callback: () => void) => {
    return {
        observe: (element: HTMLElement | null) => {
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
            observer.value?.observe(element!);
        },
        unobserve: (element: HTMLElement | null) => {
            observer.value?.unobserve(element!);
        }
    };
};
