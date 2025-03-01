<template>
  <div class="box7">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: {
      text: '散点图',
      left: '40%',
      textStyle: {
        color: 'white',
        fontSize: 16,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: '',
      show: false,
    },
    grid: {
      left: 10,
      right: 0,
      top: 0,
      bottom: 20,
    },
    series: {
      type: 'scatter',
      data: [337, 880, 21, 9, 788, 234, 1213, 1232, 5578, 444, 33, 999],
      symbol: 'diamond',
      symbolSize: 20,
      label: {
        show: true,
        position: 'top',
        color: 'yellowgreen',
      },
    },
  })
})
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  .title {
    p {
      color: white;
      font-size: 16px;
    }
  }

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>
