<template>
  <el-card v-loading="loading">
    <div slot="header" class="clearfix">
      <el-button type="primary" size="small" @click="show = true">添加广告位</el-button>
    </div>

    <el-table :data="adSpaceTbData" width="100%" border>
      <el-table-column
        prop="spaceKey"
        label="spaceKey"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime "
        label="更新时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="() => {
            adSpace = scope.row
            isEdit = true
            show = true
          }">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      :disabled="loading"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>

    <el-dialog
      :title="`${isEdit ? '编辑' : '添加'}广告位`"
      :visible.sync="show"
      v-if="show"
      :before-close="handleClose"
      width="40%">
      <el-form ref="form" :model="adSpace" label-width="100px" size="small">
        <el-form-item label="广告位名称" prop="name">
          <el-input v-model="adSpace.name" placeholder="填写广告位名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!isEdit" size="small" @click="resetForm">重 置</el-button>
        <el-button type="primary" size="small" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllAsSpace, saveOrUpdateAdSpace } from '@/services/advert'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'AdSpaceList',
  data () {
    return {
      adSpaceData: [],
      adSpaceTbData: [],
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      show: false,
      adSpace: {},
      isEdit: false
    }
  },
  methods: {
    async initAdSpaceData () {
      this.loading = true
      const { data } = await getAllAsSpace()
      if (data.success) {
        this.adSpaceData = data.content
        this.page.total = this.adSpaceData.length
        this.pageChange()
      }
      this.loading = false
    },
    handleSizeChange (val: number) {
      this.page.pageSize = val
      this.loading = true
      setTimeout(() => {
        this.pageChange()
        this.loading = false
      }, 500)
    },
    handleCurrentChange (val: number) {
      this.page.currentPage = val
      this.loading = true
      setTimeout(() => {
        this.pageChange()
        this.loading = false
      }, 500)
    },
    pageChange () {
      const start = (this.page.currentPage - 1) * this.page.pageSize
      let end = this.page.currentPage * this.page.pageSize
      end = end <= this.adSpaceData.length ? end : this.adSpaceData.length
      this.adSpaceTbData = this.adSpaceData.slice(start, end)
    },
    async submit () {
      const { data } = await saveOrUpdateAdSpace(this.adSpace)
      if (data.success) {
        this.$message.success(`${this.isEdit ? '修改' : '添加'}成功！`)
        this.handleClose()
        await this.initAdSpaceData()
      } else {
        this.$message.error(data.message)
      }
    },
    handleClose () {
      this.show = false
      this.isEdit = false
      this.adSpace = {}
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    }
  },
  created () {
    this.initAdSpaceData()
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
}
</style>
