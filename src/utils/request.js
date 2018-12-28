import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import { MessageBox } from 'element-ui'
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
// create an axios instance
const service = axios.create({
  // baseURL: 'http://mch.dtest.com', // api 的 base_url
  timeout: 5000 // request timeout
  // withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }

    // if (config.url === '/admin/uploadFile.json') {
    //   config.headers['Content-Type'] = 'multipart/form-data'
    //   // Content-Type: application/x-www-form-urlencoded
    // }
    showFullScreenLoading() // load显示事件
    return config
  },
  error => {
    // Do something with request error
    tryHideFullScreenLoading()
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    tryHideFullScreenLoading()
    if (res.code !== 0) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 401) {
        // console.log(response, 'response')
        if (response.config.url === '/auth/login.json') {
          Vue.$vux.toast.text(res.message)
        } else if (response.config.url === '/admin/me.json') {
          // 不处理
        } else {
          // 请自行在引入 MessageBox
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }
      } else {
        Vue.$vux.toast.text('请求失败')
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    tryHideFullScreenLoading()
    Vue.$vux.toast.text('请求失败')
    return Promise.reject(error)
    // if (error.config.url === '/auth/logout') {
    //   sessionStorage.clear()
    //   Message({
    //     message: '退出成功!',
    //     type: 'success',
    //     duration: 5 * 1000
    //   })
    // } else {

    // }
  }
)

export default service
