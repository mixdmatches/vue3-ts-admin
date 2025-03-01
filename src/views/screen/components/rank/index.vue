<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
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
  //一个容器可以同时展示多个类型图形图标
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    // 标题组件
    title: {
      text: '景区排行',
      left: 'center',
      //主标题文字样式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
        fontWeight: 'bold',
      },
      // 子标题
      subtext: '各大景区排行',
      //子标题文字样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 14,
      },
    },
    xAxis: {
      type: 'category', //图形图表在x轴上均匀分布展示
    },
    yAxis: {},
    //布局组件
    grid: {
      left: 20,
      bottom: 20,
    },
    //系列：决定显示图形图标是哪一种，展示多个图形图表用数组
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60],
        //柱状图的：图形上的文本标签

        label: {
          show: true,
          //文字位置
          position: 'insideTop',
          //文字颜色
          color: 'yellowgreen',
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          //底部背景颜色
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
            global: false,
          },
        },
        //柱条的样式
        itemStyle: {
          //柱条的圆角
          borderRadius: [5, 5, 0, 0],
          color: '',
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60],
        smooth: true,
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 5px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
