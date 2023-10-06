<template>
    <div :id="id" class="w-full h-[350px]"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
    id: string;
}>();

onMounted(() => {
    const chartElement = document.getElementById(props.id);
    const chart = echarts.init(chartElement, 'dark');
    new ResizeObserver(() => {
        chart.resize();
    }).observe(chartElement as HTMLElement);

    let base = +new Date(1968, 9, 3);
    const oneDay = 24 * 3600 * 1000;
    const date = [];
    const data = [Math.random() * 300];

    for(let i = 1; i < 20000; i++) {
        const now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]!));
    }
    console.log(data);
    console.log(date);
    const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        title: {
            show: false
        },
        toolbox: {
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'Fake Data',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: '#0000e6'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#2a3a6f'
                        },
                        {
                            offset: 1,
                            color: '#151d38'
                        }
                    ])
                },
                data
            }
        ]
    };

    option && chart.setOption(option);
});
</script>
