<template>
  <div class="box5">
    <div class="title">
      <p>未来7天游客量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
let line = ref()
onMounted(() => {
  let myChart = echarts.init(line.value)
  //设置配置项
  myChart.setOption({
    title: {
      text: '访问量',
    },
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线
      axisLine: {
        show: true,
      },
      //刻度线
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 20,
    },
    series: [
      {
        type: 'line',
        data: [0, 120, 1240, 55, 2299, 321, 890, 1200],
        // 平滑曲线
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
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
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box5 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  // margin: 0px 20px;
  .title {
    margin-left: 10px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
