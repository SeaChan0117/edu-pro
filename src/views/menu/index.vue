<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({
          name: 'menu-create'
        })">添加菜单
        </el-button>
      </div>
      <template>
        <el-table
          size="small"
          border
          :data="menus"
          style="width: 100%">
          <el-table-column
            type="index"
            label="编号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            min-width="150"
            prop="name"
            label="菜单名称"
            width="200">
          </el-table-column>
          <el-table-column
            min-width="150"
            prop="level"
            label="菜单级数">
            <template slot-scope="scope">
              <span>{{ scope.row.level === 0 ? '一级' : '二级' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            prop="icon"
            label="前端图标">
          </el-table-column>
          <el-table-column
            min-width="150"
            prop="orderNum"
            label="排序">
          </el-table-column>
          <el-table-column
            min-width="150"
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="editMenuHandle(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delMenuHandle(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    async getAllMenuHandle () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    editMenuHandle (menu: any) {
      console.log(menu)
    },
    delMenuHandle (menu: any) {
      console.log(menu)
    }
  },
  created () {
    this.getAllMenuHandle()
  }
})
</script>

<style lang="scss" scoped>

</style>
