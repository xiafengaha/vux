<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <div>
      <!--<x-button type="primary" @click="login">登陆</x-button>-->

    </div>
    <group>
      <x-input v-number="ruleForm.value" v-model="ruleForm.value" placeholder="保留两位小数"></x-input>
    </group>
    <!--<box>-->
      <x-button type="primary" v-db-click @click.native="getInput">点我</x-button>
    <p>已限制用户多次点击，具体样式依据项目进行修改</p>
    <!--</box>-->

  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { loginByUsername } from '@/api/login'
export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      ruleForm: {
        value: ''
      },
      msg: 'Hello World!'
    }
  },
  methods: {
    login () {
      console.log('点了登陆')
      // let params = {
      //   username: 'admin',
      //   password: 'admin'
      // }
      loginByUsername('admin', 'admin').then(res => {
        console.log(res)
      })
    },
    getInput () {
      console.log(this.ruleForm)
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
