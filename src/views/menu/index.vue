<template>
  <div class="menu">
    <el-card>
      <div slot="header" class="clearfix">
        <el-button
          type="primary"
          size="mini"
          :disabled="loading"
          @click="$router.push({
          name: 'menu-create'
        })">添加菜单
        </el-button>
      </div>
      <template>
        <el-table
          v-loading="loading"
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
              <el-button @click="editMenuHandle(scope.row)" size="small">编辑</el-button>
              <el-button @click="delMenuHandle(scope.row)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, delMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: [],
      loading: false
    }
  },
  methods: {
    async getAllMenuHandle () {
      this.loading = true
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
      this.loading = false
    },
    editMenuHandle (menu: any) {
      this.$router.push({
        name: 'menu-edit',
        query: {
          id: menu.id
        }
      })
    },
    delMenuHandle (menu: any) {
      this.$confirm('确认删除吗？', '删除提示')
        .then(async () => {
          // 确认
          const { data } = await delMenu(menu.id)
          if (data.code === '000000') {
            this.$message.success('删除成功！')
            await this.getAllMenuHandle()
          }
        })
        .catch(() => {
          // 取消
          this.$message.info('已取消删除！')
        })
    }
  },
  created () {
    this.getAllMenuHandle()
  }
})
</script>

<style lang="scss" scoped>

</style>
