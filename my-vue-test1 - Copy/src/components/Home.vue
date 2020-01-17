<template>
  <div>
    <h3>{{ msg }}</h3>
    <div id="myChart" ref="myChartRef" :style="{width: '1500px', height: '350px'}"></div>
    <div :style="{width: '1500px', height: '350px'}">
    <el-button type="success" style="float:right" @click="this.queryData">重置</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  axios.defaults.baseURL = '/api'

  export default {
    name: 'home',     // 组件可以有自己的名字。

    data() {         // 组件的data必须是函数
      return {
        ind:1,
        myChart:"",
        timer: '',
        axisData: '',
        option: {
          title: {
            text: '动态数据',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            }
          },
          legend: {
            data: ['最新成交价', '预购队列']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: (function () {
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                  now = new Date(now - 2000);
                }
                return res;
              })()
            },
            {
              type: 'category',
              boundaryGap: true,
              data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                  res.push(10 - len - 1);
                }
                return res;
              })()
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: '价格',
              max: 30,
              min: 0,
              boundaryGap: [0.2, 0.2]
            },
            {
              type: 'value',
              scale: true,
              name: '预购量',
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: [
            {
              name: '预购队列',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                  res.push(Math.round(Math.random() * 1000));
                }
                return res;
              })()
            },
            {
              name: '最新成交价',
              type: 'line',
              data: (function () {
                var res = [];
                var len = 0;
                while (len < 10) {
                  res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                  len++;
                }
                return res;
              })()
            }
          ]
        },
        msg: '这里是Home视图',
        chartData: [],
        chartXaxisData: []
      }
    }, mounted() {
      this.myChart = this.$echarts.init(this.$refs.myChartRef);
      this.queryData();
      this.timer = setInterval(
        // this.axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        //
        // this.option.series[0].data.shift();
        //
        // this.option.xAxis[0].data.shift();
        // this.option.xAxis[0].data.push(axisData);
        // this.option.xAxis[1].data.shift();
        // this.option.xAxis[1].data.push(app.count++);
        // let myChart2 = this.$echarts.init(this.$refs.myChartRef2);
        // myChart2.setOption(option);
        this.pushData
      , 1000);

    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      reset() {
        this.queryData();
      },
      queryData() {
        axios.get('/queryData')
          .then(response => {
            console.log("response:" + response.data);
            this.chartData = response.data;
            axios.get('/queryCols')
              .then(response => {
                console.log("response:" + response.data);
                this.chartXaxisData = response.data;
                this.drawLine();
              })
              .catch(function (error) {
                console.log(error);
              })
          })
          .catch(function (error) {
            console.log(error);
          })
      }, pushData() {
        axios.get('/queryOneData')
          .then(response => {
            this.chartData.shift();
            this.chartData.push(response.data);
            this.chartXaxisData.shift();
            this.chartXaxisData.push(response.data);
            this.drawLine();
          })
          .catch(function (error) {
            console.log(error);
          })
      },

      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById('myChart'))
        // let myChart = this.$echarts.init(this.$refs.myChartRef);
        // let myChart2 = this.$echarts.init(this.$refs.myChartRef2);
        // 绘制图表
        this.myChart.setOption({
          title: {text: '浩浩超市销量图'},
          tooltip: {},
          legend: {
            data:['最新成交价']
          },tooltip: {
            trigger: 'axis',
          },
          xAxis: [{
            name:'最新成交价',
            data: this.chartXaxisData,
          }],
          yAxis: {},
          series: [{
            name: '最新成交价',//鼠标悬浮显示信息
            type: 'line',
            data: this.chartData,
            smooth: true,
            areaStyle: {}
          }]
        });
        // myChart2.setOption(option);
      }
    }
  }
</script>

<style scoped>
  h3 {
    background-color: #1f0125;
    color: white;
    width: 20%;
  }
</style>


