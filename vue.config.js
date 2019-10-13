const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/_vars.scss"; @import "~element-ui/packages/theme-chalk/src/common/var";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('services', path.resolve(__dirname, './src/services'))
      .set('utils', path.resolve(__dirname, './src/utils'))
  }
}
