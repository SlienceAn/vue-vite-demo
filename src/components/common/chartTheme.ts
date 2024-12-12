export default {
  color: [
    '#409EFF',
    '#36CE9E',
    '#f56e6a',
    '#626c91',
    '#edb00d',
    '#909399'
  ],
  grid: {
    left: '1%',
    right: '1%',
    bottom: '1%',
    top: '30',
    containLabel: true
  },
  title: {
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold'
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    textStyle: {
      color: '#999',
      fontSize: 12
    },
    inactiveColor: 'rgba(128,128,128,0.4)',
    itemWidth: 18,
    itemHeight: 12,
  },
  yAxis: [
    {
      type: 'value'
    }
  ],
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(128,128,128,0.2)',
        width: 1
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      color: '#999'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#eee'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(255,255,255,0.01)',
          'rgba(0,0,0,0.01)'
        ]
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#999'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(128,128,128,0.2)'
      }
    }
  }
}
