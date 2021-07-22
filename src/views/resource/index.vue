<template>
  <div class="resource">
    <el-card>
      <el-form :model="filterObj" ref="filter" label-width="120px">
        <el-form-item label="资源名称：">
          <el-input v-model="filterObj.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="filterObj.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类：">
          <el-select v-model="filterObj.categoryId" placeholder="全部">
            <el-option
              v-for="item in resourceCategory"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="resetFilter">重置</el-button>
          <el-button size="mini" type="primary" @click="initResourceTableData">查询</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div>
        <el-button size="mini">添加</el-button>
        <el-button size="mini">资源分类</el-button>
      </div>
      <el-divider></el-divider>
      <el-table
        size="small"
        border
        :data="resources"
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
          label="资源名称"
          width="200">
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          min-width="150"
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="editResourceHandle(scope.row)" size="small">编辑</el-button>
            <el-button @click="delResourceHandle(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterObj.current"
        :page-sizes="[10, 20, 50]"
        :page-size="filterObj.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterObj.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategory, getResourcePages } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      filterObj: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 10,
        total: 0
      },
      resourceCategory: [],
      resources: []
    }
  },
  methods: {
    async getAllCategory () {
      const { data } = await getAllCategory()
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },
    async initResourceTableData () {
      const { data } = await getResourcePages(this.filterObj)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.filterObj.total = data.data.total
      }
    },
    resetFilter () {
      this.filterObj.name = ''
      this.filterObj.url = ''
      this.filterObj.categoryId = ''
    },
    handleSizeChange (val: number) {
      this.filterObj.size = val
      this.initResourceTableData()
    },
    handleCurrentChange (val: number) {
      this.filterObj.current = val
      this.initResourceTableData()
    },
    editResourceHandle (item: any) {
      console.log(item)
    },
    delResourceHandle (item: any) {
      console.log(item)
    }
  },
  created () {
    this.getAllCategory()
    this.initResourceTableData()
  }
})
</script>

<style lang="scss" scoped>
.resource {
  .el-form-item {
    display: inline-block;
  }

  .el-pagination {
    text-align: right;
  }
}
</style>
