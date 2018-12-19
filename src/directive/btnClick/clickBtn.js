// import Vue from 'vue'
export default {}.install = (Vue, options = {}) => {
  Vue.directive('dbClick', {
    inserted (el, binding) {
      el.addEventListener('click', e => {
        if (!el.disabled) {
          el.disabled = true
          el.style.cursor = 'not-allowed'
          setTimeout(() => {
            el.style.cursor = 'pointer'
            el.disabled = false
          }, 1500)
        }
      })
    }
  })
}
