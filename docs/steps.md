# 前期准备
* 确认node npm 使用的最新稳定版本，本机环境Vue Cli(verion:3.9.2),Node(version:10.16.0),NPM(version:6.10.1)
* 配置国内镜像`npm config set registry https://registry.npm.taobao.org`
* 配置VS Code(Plugin: ESLint、Vetur、TODO Highlight、prettier)
* 使用自定义的编辑器VScode来编写`git commit`日志，`git config --global core.editor "code --wait"`
* `npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/`

# 使用脚手架工具搭建项目框架
* git init或者clone一个空项目
* vue create搭建项目基础框架(在进行preset选择时将vue router、Vuex、Sass with node-sass选中,ESlint + Standard config或者也可以ESlint + Prettier,Lint and fix on commit)
* 使用`vue add element-ui`添加Element UI，考虑到后期有可能需要修改element的默认样式，所以在添加eleent的时候需要选择使用scss theme(安装过程中会提示)

# 完善项目目录结构
使用vue-cli工具搭建完项目基础框架后，根据项目的具体情况对目录结构进一步的调整
* 根据模块建立视图文件夹，所有视图根据模块来保存在对应的文件夹内
* 在views下建立layout目录，用于保存页面的整体布局
* 创建utils文件夹，用于保存存放功能文件
* 创建services文件夹，用于保存服务(接口)调用文件
* 创建assets文件夹，放置所有的公共静态资源（图片，图标，样式）
* components下创建global文件夹，放置全局公共组件
```
|--build
|--public
|--src
|  |--lang
|  |--assets
|  |  |--images
|  |  |--icons
|  |  |--styles
|  |--components
|  |  |--global
|  |--views
|  |  |--layout
|  |  |--user
|  |  |--news
|  |--utils
|  |  |--request.js
|  |--services
|  |  |--user
|  |  |--news
|  |  |--index.js
|  |--router
|  |  |--user
|  |  |--news
|  |  |--index.js
|  |--store
|  |  |--user
|  |  |--news
|  |  |--index.js
|  |--App.vue
|  |--main.js
|--.env
|--.env.development
|--.env.production
|--vue.config.js
```
# 第三方通用工具包安装

## normalize.css
使用normalize.css能够让我们在各个浏览器得到一样的渲染样式效果，因为各个浏览器的默认样式是存在细微出入的，使用normalize.css能够解决这个问题。

## axios
使用axios来实现ajax的请求，并通过配置拦截器来实现通用配置的添加
* 从环境变量获取接口请求的地址，根据环境的不同可以将地址配置在不同的文件中`.env.development`和`.env.production`
* 在utils文件夹下新建文件request.js，实现axios的实例化和拦截器方法，并导出实例
* 请求拦截器，对用户的授权token进行统一添加
* 响应拦截器，对响应的信息进行统一前置处理，使用element-ui的`Message`组件实现提示功能

## NProgress
NProgress能够为我们在路由跳转，ajax请求加载过程中提供友好的进度条效果。谷歌，Youtube，Medium都有类似的效果，使用这种方式对操作用户非常友好。通用使用场景有两个地方：
* 路由切换的时候，在全局路由导航守卫添加该方法
* ajax请求过程中，在请求拦截器和响应拦截器实现该方法

## 强制代码规范检查  
* husky和lint-staged(使用vue cli已经有集成了，可以直接使用https://cli.vuejs.org/guide/cli-service.html#git-hooks)，实现代码规范性检查

# 路由管理
根据项目的规模考虑是否分模块对路由进行管理，在一般的中大型项目中不会将路由放置在一个文件中，会根据模块来处理，并使用动态加载和自动加载的方式实现路由的灵活配置加载
* 使用`require.context`进行自动加载
* 使用`router.addRoutes`实现路由的动态加载
* 在index.js添加全局路由守卫，用于页面加载状态展示和页面级别的权限控制
* [optional]使用路由的meta来实现前端页面级访问权限控制，meta保存页面的元信息如：title、访问权限等


# 全局组件自动加载注册
对于一些特定的自定义组件，我们有时候会需要在整个项目里面多处使用，如果使用频率不高那么可以在页面引用即可；如果在项目中频繁使用到建议做成全局的组件；如果在多个项目中都会使用到建议做成package的方式使用plugin的机制引入到各个项目中。这里先介绍如何使用全局组件自动加载注册机制。

在官方文档[Automatic Global Registration of Base Components](https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components)

# vue.config.js配置
## 使用loaderOption实现统一的样式变量定义(包括element的样式变量)
使用`css.loaderOptions`能够将配置选项传递给特定的loaders，详情可参考[css.loaderOptions](https://cli.vuejs.org/config/#css-loaderoptions)，在实际项目中会使用这个选项来处理
* sass全局变量
```js
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      sass: {
        data: `@import "~@/variables.sass"`
      },
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `data` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        data: `@import "~@/variables.scss";`
      },
      // pass Less.js Options to less-loader
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
```
* postcss px到vw或rem的转换(移动端)
这部分内容详情请查看移动端界面适配解决方案

## alias别名
未避免啊在使用import引入模块的时候输入过多的路径信息，可以使用alias来解决此问题(默认@符号的使用就是使用该方法)
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY,
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('services', path.resolve(__dirname, './src/services'))
  }
}
```


# 国际化支持