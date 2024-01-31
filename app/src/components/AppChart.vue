<template>
    <div id="chart" class="w-full h-[70vh] min-h-[500px]"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
    const chartElement = document.getElementById('chart');
    const chart = echarts.init(chartElement, 'dark');
    new ResizeObserver(() => {
        chart.resize();
    }).observe(chartElement as HTMLElement);

    let base = +new Date(1968, 9, 3);
    const oneDay = 24 * 3600 * 1000;
    const date = [];
    const data = [Math.random() * 300];

    for (let i = 1; i < 300; i++) {
        const now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]!));
    }
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
                    color: '#0eb064',
                    width: 70,
                    opacity: 0.1
                }
            },
            formatter(params) {
                const chartData = Array.isArray(params) ? params[0]! : [params][0]!;
                const name = chartData.name;
                const val = chartData.value as number;
                const colorBullet = val < 100 ? 'red' : 'green';
                const str =
                `<span style="background-color:${
                    colorBullet
                }; width: 10px; height: 10px; display: inline-block; border-radius: 50%"></span>` +
                `<span style="color: white">Date : ${name}<br>Valeur : ${val}</span>`;
                return str;
            },
            backgroundColor: 'rgba(50,50,50,0.3)',
            borderColor: 'transparent',
            extraCssText: 'backdrop-filter: blur(10px)'
        },
        title: {
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            min: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(0, 0, 0, 0.3)'
                }
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
                symbolSize: 13,
                showSymbol: false,
                smooth: true,
                itemStyle: {
                    color: 'white',
                    borderColor: 'green',
                    borderWidth: 6
                },
                lineStyle: {
                    color: '#0eb064',
                    width: 3,
                    type: 'solid',
                    cap: 'round',
                    join: 'bevel',
                    shadowColor: '#0eb064',
                    shadowBlur: 5
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#0eb064'
                        },
                        {
                            offset: 1,
                            color: 'transparent'
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
