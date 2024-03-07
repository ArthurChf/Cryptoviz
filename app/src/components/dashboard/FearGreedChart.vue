<template>
    <div :id="fearGreedChartId" class="w-full min-h-[320px]"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import * as echarts from 'echarts';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { useSocketStore } from '@/stores/socketStore';

const chart = shallowRef<echarts.ECharts>();
const fearGreedChartId = 'fearGreedChart';

const sentiment = ref(50);

const updateChartData = (data: number) => {
    sentiment.value = data;

    chart.value!.setOption({
        series: [
            {
                data: [
                    {
                        value: sentiment.value
                    }
                ]
            }
        ]
    });
};

onMounted(() => {
    const chartElement = document.getElementById(fearGreedChartId) as HTMLElement;
    chart.value = echarts.init(chartElement);

    new ResizeObserver(() => {
        chart.value!.resize();
    }).observe(chartElement);

    const option: echarts.EChartsOption = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '55%'],
                radius: '96%',
                min: 0,
                max: 100,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 25,
                        color: [
                            [0.25, '#d92a2a'],
                            [0.5, '#f86530'],
                            [0.75, '#ffa938'],
                            [1, '#10b569']
                        ]
                    }
                },
                pointer: {
                    icon: 'circle',
                    width: 25,
                    itemStyle: {
                        color: 'white',
                        borderColor: '#1c9d61',
                        borderWidth: 8
                    },
                    offsetCenter: [0, '-62.5%']
                },
                axisTick: {
                    length: 17,
                    lineStyle: {
                        color: 'auto',
                        width: 6
                    }
                },
                splitLine: {
                    length: 30,
                    lineStyle: {
                        color: 'auto',
                        width: 8
                    }
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    fontSize: 25,
                    offsetCenter: [0, '-25%'],
                    formatter(value) {
                        let description = '';
                        if (value < 50) description = 'Negative';
                        else if (value === 50) description = 'Neutral';
                        else description = 'Positive';

                        return `${value}\n${description}`;
                    },
                    color: '#c3c3c3'
                },
                data: [
                    {
                        value: sentiment.value
                    }
                ]
            }
        ]
    };

    option && chart.value!.setOption(option);

    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_CURRENCY_FEAR_AND_GREED
    };
    const socketOptions: SocketOptions = {
        eventName: SocketEventEnum.CRYPTO_GET_CURRENCY_FEAR_AND_GREED
    };
    useFetchData(httpOptions, socketOptions, (data) => {
        updateChartData(data as number);
    });

    const socketStore = useSocketStore();
    const updateDataCallback = () => {
        updateChartData(50);
    };

    socketStore.onCurrencyUpdate(updateDataCallback, httpOptions, socketOptions);
    socketStore.onPeriodUpdate(updateDataCallback, httpOptions, socketOptions);
});
</script>
