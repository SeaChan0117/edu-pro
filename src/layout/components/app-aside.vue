<template>
  <el-menu
    :default-active="curMenu"
    @open="handleOpen"
    :collapse="isClose"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">
      <i class="icon-lagou"></i>
      <span slot="title"><h3 style="display: inherit;margin-left: 10px">Edu Boss</h3></span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-lock"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/role">
        <i class="el-icon-setting"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="/menu">
        <i class="el-icon-setting"></i>
        <span slot="title">菜单管理</span>
      </el-menu-item>
      <el-menu-item index="/resource">
        <i class="el-icon-setting"></i>
        <span slot="title">资源管理</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/course">
      <i class="el-icon-collection"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-files"></i>
        <span>广告管理</span>
      </template>
      <el-menu-item index="/advert">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">广告列表</span>
      </el-menu-item>
      <el-menu-item index="/advert-space">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">广告位列表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppAside',
  data () {
    return {
      curMenu: '/'
    }
  },
  computed: {
    isClose () {
      return this.$store.state.isMenuClose
    }
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  min-height: 100vh;

  .icon-lagou {
    display: inline-block;
    background-image: url("/logo.png");
    width: 30px;
    height: 30px;
    background-size: 30px 30px;
  }
}
</style>
