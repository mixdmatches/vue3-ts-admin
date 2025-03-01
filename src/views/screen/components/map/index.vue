<template>
  <div class="box4" ref="map">地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//引入中国地图json数据
import chinaJSON from './china.json'
let map = ref()
//注册中国地图
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let mychart = echarts.init(map.value)
  mychart.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放效果
      // i地图位置

      //地图上的文字设置
      label: {
        show: true, //文字显示
        color: 'white',
        fontSize: 10,
      },
      //每个多边形样式
      itemStyle: {
        color: {
          //线性渐变
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red',
            },
            {
              offset: 1,
              color: 'blue',
            },
          ],
        },
        opacity: 0.8,
      },
      //地图高亮效果
      emphasis: {
        itemStyle: {
          color: 'red',
          opacity: 1,
        },
        label: {
          fontSize: 30,
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.46, 39.92], //起点
              [121.48, 31.22], //终点
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              opacity: 0.8,
            },
            // 是否显示特效
            effect: {
              show: true,
              symbol: 'rect',
            },
          },
        ],
        // 开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'red',
          symbolSize: 30,
        },
      },
    ],
  })
})
</script>

<style scoped></style>
