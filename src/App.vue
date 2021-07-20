<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <!--    跟路由出口-->
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <p class="text">hello world</p>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then(_ => {
  console.log(_)
})

export default Vue.extend({
  name: 'App',
  data () {
    return {
      foo: {}
    }
  }
})
</script>
<style lang="scss" scoped>
.text {
  color: $success-color;
}
</style>
