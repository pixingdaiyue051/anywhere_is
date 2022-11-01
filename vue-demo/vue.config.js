// vue.config.js是一个可选的配置文件
// 也可以改为在package.json中增加vue字段
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js', // 入口js
      template: 'public/index.html', // 模板来源
    }
  },
  lintOnSave: false, // 关闭语法检查
  productionSourceMap: false, // 不生成.map文件 加快构建速度
  // publicPath: '/aa', // 项目路径
  devServer: { 
    // 访问域名
    // host: 'eee222',
    // 开启时的访问端口
    // port: 8089,
    // 开启代理服务器
    proxy: {
      '/boot': {
        target: 'http://127.0.0.1:8005/',
        ws: false, // 支持提升为websocket请求 默认true
        changeOrigin: true, // 改成虚拟请求host 以配合与服务器host一致 默认true
        pathRewrite: {
          '^/boot': ''
        }
      },
      '/viva': {
        target: 'http://127.0.0.1:8005/viva/',
        ws: true, // 支持提升为websocket请求 默认true
        changeOrigin: false,
        pathRewrite: {
          '^/viva': ''
        }
      },
      '/mid': {
        target: 'http://127.0.0.1:8001/',
        // target: 'http://8.136.146.58:8081/middle',
        ws: false,
        pathRewrite: {
          '^/mid': ''
        }
      },
      '/backend': {
        // target: 'http://127.0.0.1:7605/',
        target: 'https://jiansuotong.top/sc/test/',
        ws: false,
        pathRewrite: {
          '^/backend': ''
        }
      }
    }
  }
}
// "vue": {
//   "pages": {
//     "index": {
//       "entry": "src/main2.js"
//     }
//   }
// }