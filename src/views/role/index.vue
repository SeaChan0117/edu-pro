<template>
  <div class="role">
    <el-card>
      <el-form :model="filter" size="small">
        <div class="filter-content">
          <el-form-item label="角色名称" label-width="120px">
            <el-input placeholder="角色名称" v-model="filter.name" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini">重置</el-button>
            <el-button type="primary" size="mini">查询</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-divider></el-divider>

      <div>
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>

      <el-divider></el-divider>

      <el-table
        size="small"
        border
        :data="roles"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="name"
          label="角色名称"
          width="350">
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="description"
          label="描述"
          width="350">
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="createdTime"
          label="添加时间"
          width="350">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          fixed="right"
          label="操作"
          width="150">
          <template>
            <el-button type="text" size="mini">分配菜单</el-button>
            <el-button type="text" size="mini">分配资源</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRolesList } from '@/services/role'

export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      filter: {
        name: ''
      },
      roles: []
    }
  },
  methods: {
    async initRoles () {
      const { data } = await getRolesList(this.filter)
      if (data.code === '000000') {
        this.roles = data.data.records
      }
    }
  },
  created () {
    this.initRoles()
  }
})
</script>

<style lang="scss" scoped>
.filter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    display: inline-block;
  }
}
</style>
