import Vue from 'vue'
// var debounce = require('lodash.debounce')
import { debounce } from 'vux'
let needLoadingRequestCount = 0

export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    // endLoading()
    debounce(tryCloseLoading, 300)()
  }
}
var loading
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}
const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
