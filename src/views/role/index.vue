<template>
  <div class="role">
    <el-card>
      <el-form :model="filter" ref="filter" size="small">
        <div class="filter-content">
          <el-form-item label="角色名称" label-width="120px" prop="name">
            <el-input placeholder="角色名称" v-model="filter.name" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="resetForm" :disabled="loading">重置</el-button>
            <el-button type="primary" size="mini" @click="initRoles" :disabled="loading">查询</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-divider></el-divider>

      <div>
        <el-button size="mini" type="primary" @click="createOrEditFlag = true" :disabled="loading">添加角色</el-button>
      </div>

      <el-divider></el-divider>

      <el-table
        v-loading="loading"
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
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$router.push({
              name: 'alloc-menu',
              params: {
                roleId: scope.row.id
              }
            })">
              分配菜单
            </el-button>
            <el-button type="text" size="mini" @click="$router.push({
              name: 'alloc-resource',
              params: {
                roleId: scope.row.id
              }
            })">
              分配资源
            </el-button>
            <el-button type="text" size="mini" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="delRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <create-or-edit v-if="createOrEditFlag" :show="createOrEditFlag" :edit-data="editData" @close="createOrEditClose"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { delRole, getRolesList } from '@/services/role'
import { Form } from 'element-ui'
import CreateOrEdit from '@/views/role/components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleIndex',
  components: { CreateOrEdit },
  data () {
    return {
      filter: {
        name: ''
      },
      roles: [],
      createOrEditFlag: false,
      editData: null,
      loading: false
    }
  },
  methods: {
    async initRoles () {
      this.loading = true
      const { data } = await getRolesList(this.filter)
      if (data.code === '000000') {
        this.roles = data.data.records
      }
      this.loading = false
    },
    resetForm () {
      (this.$refs.filter as Form).resetFields()
      this.initRoles()
    },
    createOrEditClose () {
      this.createOrEditFlag = false
      this.editData = null
      this.initRoles()
    },
    editRole (role: any) {
      this.editData = role
      this.createOrEditFlag = true
    },
    delRole (role: any) {
      this.$confirm('确认删除该角色吗？', '删除提示')
        .then(async () => {
          const { data } = await delRole(role.id)
          if (data.code === '000000') {
            this.$message.success('删除成功！')
            await this.initRoles()
          }
        })
        .catch(() => {
          this.$message.info('取消删除！')
        })
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
