const path = require('path')
function resolve (dir) {
    // __dirname ：可以用来获取当前文件模块所属目录的绝对路径 动态获取
    //__filename ： 可以用来获取当前文件的绝对路径 动态获取
    return path.join(__dirname, dir)
  }
const port = process.env.port || process.env.npm_config_port || 80 // 端口
module.exports = {
    publicPath:'./',
    outputDir:'dist',
    assetsDir:'static',
    lintOnSave: false,// process.env.NODE_ENV !== 'production',
    productionSourceMap: process.env.NODE_ENV !== 'production',
    devServer:{
        host: '0.0.0.0',
        port: port,
        open: true,
        historyApiFallback: true,
        proxy:{
            [process.env.VUE_APP_BASE_API]: {
                target: `http://`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },
    // configureWebpack: {
    //     resolve: {
    //       extensions: ['.js', '.vue', '.json'],
    //       alias: {
    //         '@': resolve('src')
    //       }
    //     }
    // },
    chainWebpack (config) {
        config.module
        .rule('svg')
        .exclude.add(resolve('src/assets/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
    }

}