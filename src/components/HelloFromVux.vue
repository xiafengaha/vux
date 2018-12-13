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
      <x-button type="primary" @click="login">登陆</x-button>
    </div>
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
