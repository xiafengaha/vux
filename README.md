# vux

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).<br/>
vux的loading事件，目前暂未有好的解决方法，所以引用了element的loading事件解决axios请求时候的等待<br/>
新加入防止按钮重复点击指令以及限制输入正数且保留两位小数限制指令
