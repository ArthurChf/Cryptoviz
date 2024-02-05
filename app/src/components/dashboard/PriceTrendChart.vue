<template>
    <div :id="priceTrendChartId" class="w-full h-[70vh] min-h-[500px]"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import * as echarts from 'echarts';

const chart = shallowRef<echarts.ECharts>();
const priceTrendChartId = 'priceTrendChart';

const months = ref(['2023-09-01', '2023-09-02', '2023-09-03', '2023-09-04', '2023-09-05', '2023-09-06', '2023-09-07']);
const prices = ref([12, 53, 47, 39, 54, 49, 68]);
const hours = ref(['08:00:00', '10:30:00', '05:32:00', '15:45:00', '09:00:00', '18:30:00', '20:00:00']);

const updateChartData = () => {
    const randomPrice = prices.value[Math.floor(Math.random() * prices.value.length)]!;
    const randomMonth = months.value[Math.floor(Math.random() * months.value.length)]!;
    const randomHour = hours.value[Math.floor(Math.random() * hours.value.length)]!;
    prices.value.push(randomPrice);
    months.value.push(randomMonth);
    hours.value.push(randomHour);

    chart.value!.setOption({
        xAxis: {
            data: months.value
        },
        series: [
            {
                data: prices.value
            }
        ]
    });
};

onMounted(() => {
    const chartElement = document.getElementById(priceTrendChartId) as HTMLElement;
    chart.value = echarts.init(chartElement);

    new ResizeObserver(() => {
        chart.value!.resize();
    }).observe(chartElement);

    const option: echarts.EChartsOption = {
        animation: false,
        grid: {
            top: 60,
            right: 60,
            bottom: 60,
            left: 60
        },
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'solid',
                    color: '#10b569',
                    width: 70,
                    opacity: 0.1
                }
            },
            formatter(params) {
                const chartData = Array.isArray(params) ? params[0]! : [params][0]!;
                const month = chartData.name;
                const value = chartData.value as number;
                const hour = hours.value[chartData.dataIndex]!;
                const bulletColor = value < 40 ? '#d92a2a' : '#10b569';

                const str = `
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center justify-between text-md gap-16">
                            <span class="font-semibold text-title">${month}</span>
                            <span class="font-medium text-subtitle">${hour}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center gap-1">
                                <span style="background-color:${bulletColor};" class="w-3 h-3 mr-1 inline-block rounded-full"></span>
                                <span class="font-medium text-md text-subtitle">Price: </span>
                                <span class="font-semibold text-md text-title">$${value}</span>
                            </div>
                        </div>
                    </div>
                `;
                return str;
            },
            backgroundColor: 'rgba(19, 23, 32, 0.7)',
            borderColor: 'transparent',
            borderRadius: 10,
            padding: [12, 15],
            shadowColor: 'transparent',
            extraCssText: 'backdrop-filter: blur(5px)'
        },
        title: {
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: months.value,
            axisLabel: {
                color: '#adadad',
                margin: 40,
                fontWeight: 'bold',
                fontSize: 13
            },
            axisLine: {
                lineStyle: {
                    color: '#1d2632',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '50%'],
            min: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: '#1d2632'
                }
            },
            axisLabel: {
                color: '#adadad',
                margin: 40,
                fontWeight: 'bold',
                fontSize: 13
            }
        },
        dataZoom: [
            {
                type: 'inside',
                zoomLock: false,
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                show: false
            }
        ],
        series: [
            {
                name: 'Crypto',
                type: 'line',
                symbol: 'circle',
                symbolSize: 11,
                showSymbol: false,
                smooth: true,
                itemStyle: {
                    color: 'white',
                    borderColor: '#1c9d61',
                    borderWidth: 5
                },
                lineStyle: {
                    color: '#10b569',
                    width: 3,
                    type: 'solid',
                    cap: 'round',
                    join: 'bevel',
                    shadowColor: '#10b569',
                    shadowBlur: 1
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#10b569'
                        },
                        {
                            offset: 1,
                            color: 'transparent'
                        }
                    ])
                },
                data: prices.value
            }
        ]
    };

    option && chart.value!.setOption(option);
});
</script>
