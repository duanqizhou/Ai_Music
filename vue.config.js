const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 开启样式适配  见 postcss.config.js
module.exports = () => {
  return {
    publicPath: './',
    configureWebpack: {
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    },
    chainWebpack: (config) => {
      config.resolve.alias
        .set('@', resolve('./src'))
    },
    css: {
      loaderOptions: {
        less: {
          // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
          lessOptions: {
            modifyVars: {
              hack: `true; @import "${resolve('./src/common/style/theme.less')}";`
            },
            javascriptEnabled: true
          }
        }
      }
    },
    devServer: {
      open: false,
      host: '192.168.5.101',
      port: '8088',
      https: false,
      hotOnly: false,
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://118.195.134.178:3000/',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
        '/bas': {
          target: 'https://api.weixin.qq.com',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/bas': ''
          }
        }
      }
    }
  }
}
