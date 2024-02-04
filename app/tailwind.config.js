export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    plugins: [],
    theme: {
        colors: {
            'title': '#fdfeff',
            'subtitle': '#c3c3c3',
            'background': '#131720',
            'container': '#161d27',
            'active': '#10b569',
            'inactive': '#d92a2a'
        },
        transitionDuration: {
            '200': '200ms'
        },
        zIndex: {
            'tooltip': '900',
            'sidebar': '850'
        }
    }
};
