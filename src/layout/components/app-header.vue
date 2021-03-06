<template>
  <div class="header">
    <div style="display: flex;height: 100%;align-items: center;">
      <el-button :icon="icon" @click="setMenuClose(!$store.state.isMenuClose)" class="side-close-btn"></el-button>
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: $route.path }">
          {{ ($route.meta && $route.meta.title) ? $route.meta.title : $route.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="35" :src="userInfo.portrait || require('../../assets/default-avatar.png')"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logoutConfirm">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo, logout } from '@/services/user'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    icon () {
      return this.$store.state.isMenuClose ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  methods: {
    ...mapMutations(['setMenuClose']),
    async loadUserInfo () {
      const { data } = await getUserInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    },
    logoutConfirm () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async logout () {
      const { data } = await logout()
      if (data.state === 1) {
        // 清除登录状态，跳转到登录页
        this.$store.commit('setUser', null)
        await this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      } else {
        this.$message.error(data.message)
      }
    }
  },
  created () {
    this.loadUserInfo()
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .side-close-btn {
    height: 100%;
    border: none;
    border-radius: 0;
    margin-right: 10px;
  }

  .side-close-btn:focus {
    background: none;
  }

  .side-close-btn:hover {
    background: rgba(0, 0, 0, .1);
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
