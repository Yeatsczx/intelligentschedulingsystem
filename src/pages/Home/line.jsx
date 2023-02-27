import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
/*
后台管理的折线图路由组件
 */
export default class Line extends Component {

  state = {
    a: [11, 19, 12, 15, 17, 15, 19, 13, 11, 18, 10, 20], // 销量的数组
    b: [13, 16, 12, 10, 12, 15, 14, 13, 19, 18, 19, 20], // 库存的数组
    c: [10, 11, 12, 13, 14, 15, 14, 13, 17, 18, 14, 20]
  }

  /*
  返回柱状图的配置对象
   */
  getOption = (a, b, c) => {
    return {
      tooltip: {},
      legend: {
        data: ['a', 'b', 'c']
      },
      xAxis: {
        data: ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"]
      },
      yAxis: {},
      series: [{
        name: 'a',
        type: 'line',
        data: a
      }, {
        name: 'b',
        type: 'line',
        data: b
      }, {
        name: 'c',
        type: 'line',
        data: c
      }]
    }
  }

  render() {
    const { a, b, c } = this.state
    return (
      <div style={{ width: 900, height: 300, float: 'right' }}>

        <ReactEcharts option={this.getOption(a, b, c)} />

      </div>
    )
  }
}