import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
/*
后台管理的折线图路由组件
 */
export default class Line extends Component {


  /*
  返回柱状图的配置对象
   */
  getOption = () => {
    return {
      tooltip: {},
      xAxis: {
        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "5", "6"]
      },
      yAxis: {},
      series: [{
        type: 'bar',
        data: [34, 45, 43, 12, 34, 22, 43, 12, 34, 41, 33, 22]
      }]
    }
  }

  render() {
    return (
      <div style={{ width: '100%', marginLeft: -30 }}>

        <ReactEcharts option={this.getOption()} />

      </div>
    )
  }
}