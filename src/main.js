// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import 'lib-flexible/flexible'
import axios from 'axios'
import { ToastPlugin, XInput, XButton } from 'vux'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import number from '@/directive/numberHandle/number' // 保留两位小数
import dbClick from '@/directive/btnClick/clickBtn' // 防止按钮重复点击
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
// import vux from 'vux'
Vue.use(VueRouter)
// Vue.use(vux)
Vue.use(Element)
Vue.use(ToastPlugin)
Vue.use(number)
Vue.use(dbClick)
Vue.prototype.$http = axios
Vue.prototype.getUrlData = function (paraName) { // 获取url某个参数
  var url = document.location.toString()
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}
const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
window.onresize = setHtmlFontSize
function setHtmlFontSize () {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
};
setHtmlFontSize()
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
