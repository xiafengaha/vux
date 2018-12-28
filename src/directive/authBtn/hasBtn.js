import Vue from 'vue'
export default {}.install = (Vue, options = {}) => {
  Vue.directive('has', {
    bind: function (el, binding) {
      let val = binding.value
      if (!Vue.prototype.$_has(val)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
// 权限检查方法
Vue.prototype.$_has = function (value) {
  // function hasPermission(roles, route) {
  // roles是菜单 route是路由, value 是传进来的
  let roles = JSON.parse(sessionStorage.getItem('userInfo')).menus // 权限菜单
  if (Array.isArray(roles)) {
    return roles.some(role => value === role)
  } else {
    return false
  }
  // if (route.meta && route.meta.role) {
  //   return roles.some(role => {
  //     let newData = route.meta.role.some(item =>
  //       item === role
  //     )
  //     return newData
  //   })
  // } else {
  //   return true
  //   // }
  // }
}
