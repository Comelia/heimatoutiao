module.exports = {
  configureWebpack: {
    // webpack 的配置
    // 排除不需要打包的包
    externals: {
      // key 是包名  value 是暴露在全局对象下的变量名
      'echarts': 'echarts',
      'element-ui': 'ELEMENT',
      'vue': 'Vue'
    }
  }
}
