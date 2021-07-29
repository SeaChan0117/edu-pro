<template>
  <el-container>
    <el-aside :width="$store.state.isMenuClose ? '65px' : '200px'" style="position: sticky;top:0;max-height: 100vh">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header style="position: sticky;top:0;z-index: 2;padding-left: 0">
        <app-header></app-header>
      </el-header>
      <el-main>
        <!--    子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}

.el-aside {
  background: #d3dce6;
}

.el-header {
  background: #ffffff;
}

.el-main {
  background: #e9eef3;
}
</style>
