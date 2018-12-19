import Vue from 'vue'
export default {}.install = (Vue, options = {}) => {
  Vue.directive('number', {
    update(el, binding, vnode) {
      let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
      ele.oninput = function() {
        // 获取相关的指令配置信息
        let rel = vnode.data.directives.filter(item => {
          return item.name === 'number'
        })[0]
        handleInput(ele, vnode, rel)
      }
    }
  })
}
function handleInput(ele, vnode, rel) {
  let val = ele.value.replace(/[^\d.]/g, '') // 去除数字和小数点以外的
  let valArr = val.split('.')
  if (valArr.length > 2) { // 获取有多少小数点
    valArr.splice(2, valArr.length - 2) // 去除第一个小数点之后的所有
  }
  if (valArr[1]) {
    valArr[1] = valArr[1].substr(0, 2)
  }
  let valStr = valArr.join('.') // 最后的结果
  setValueWithExpressionVue({
    currObj: vnode.context.$data,
    expression: rel.expression,
    value: valStr,
    key: vnode.key,
    arg: rel.arg,
    toString: rel.modifiers.string || rel.modifiers.float
  })
}
function setValueWithExpressionVue(option) {
  let expression = option.expression.split('.')
  expression.forEach(function(item, i) {
    if (i < expression.length - 1) {
      option.currObj = option.currObj[item]
    } else {
      if (option.key !== undefined) {
        option.currObj[item][option.key][option.arg] = (option.value === '' || option.toString) ? option.value : option.value * 1
      } else {
        option.currObj[item] = (option.value === '' || option.toString) ? option.value : option.value * 1
      }
    }
  })
}
