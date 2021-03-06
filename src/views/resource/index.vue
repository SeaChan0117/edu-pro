<template>
  <div class="resource">
    <el-card>
      <el-form :model="filterObj" ref="filter" label-width="120px">
        <el-form-item label="资源名称：" prop="name">
          <el-input v-model="filterObj.name" placeholder="资源名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源路径：" prop="url">
          <el-input v-model="filterObj.url" placeholder="资源路径" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源分类：" prop="categoryId">
          <el-select v-model="filterObj.categoryId" placeholder="全部" clearable>
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
          <el-button size="mini" @click="resetFilter" :disabled="loading">重置</el-button>
          <el-button size="mini" type="primary" @click="search" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div>
        <el-button type="primary" size="mini" @click="createOrEdit = true" :disabled="loading">添加</el-button>
        <el-button type="primary" size="mini" @click="$router.push({name: 'resource-category'})" :disabled="loading">资源分类</el-button>
      </div>
      <el-divider></el-divider>
      <el-table
        size="small"
        border
        :data="resources"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
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
          <template slot-scope="scope">
            <span>{{scope.row.createdTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="editResourceHandle(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="delResourceHandle(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-pagination
        :disabled="loading"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterObj.current"
        :page-sizes="[10, 20, 50]"
        :page-size="filterObj.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterObj.total">
      </el-pagination>
    </el-card>

    <resource-create-or-edit
      :show="createOrEdit"
      v-if="createOrEdit"
      :editResourceData="editResourceData"
      :categories="resourceCategory"
      @close="resourceCreateOrEditClose"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { delResource, getAllCategory, getResourcePages } from '@/services/resource'
import ResourceCreateOrEdit from '@/views/resource/components/ResourceCreateOrEdit.vue'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    ResourceCreateOrEdit
  },
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
      resources: [],
      createOrEdit: false,
      editResourceData: null,
      loading: false
    }
  },
  methods: {
    async getAllCategory () {
      const { data } = await getAllCategory()
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },
    search () {
      this.filterObj.current = 1
      this.filterObj.size = 10
      this.initResourceTableData()
    },
    async initResourceTableData () {
      this.loading = true
      const { data } = await getResourcePages(this.filterObj)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.filterObj.total = data.data.total
      }
      this.loading = false
    },
    resetFilter () {
      (this.$refs.filter as Form).resetFields()
      this.search()
    },
    handleSizeChange (val: number) {
      this.filterObj.size = val
      this.initResourceTableData()
    },
    handleCurrentChange (val: number) {
      this.filterObj.current = val
      this.initResourceTableData()
    },
    resourceCreateOrEditClose () {
      this.createOrEdit = false
      this.editResourceData = null
      this.initResourceTableData()
    },
    editResourceHandle (item: any) {
      this.editResourceData = item
      this.createOrEdit = true
    },
    delResourceHandle (item: any) {
      console.log(item)
      this.$confirm('确认删除该资源吗？', '删除提示')
        .then(async () => {
          const { data } = await delResource(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功！')
            await this.initResourceTableData()
          }
        })
        .catch(() => {
          this.$message.info('取消删除！')
        })
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
