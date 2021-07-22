<template>
  <div class="resource-category">
    <el-card>
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="createOrEdit = true">添加</el-button>
      </div>
      <el-table
        size="small"
        border
        :data="categories"
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
          label="名称"
          width="400">
        </el-table-column>
        <el-table-column
          min-width="150"
          width="350"
          prop="createdTime"
          label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="sort"
          label="排序"
          width="350">
        </el-table-column>
        <el-table-column
          min-width="150"
          fixed="right"
          label="操作"
          width="350">
          <template slot-scope="scope">
            <el-button @click="editCateHandle(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="delCateHandle(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <cate-create-or-edit v-if="createOrEdit" :show="createOrEdit" :edit-data="editData" @close="cateCreateOrEditClose"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CateCreateOrEdit from '@/views/resource/components/CateCreateOrEdit.vue'
import { delCategory, getAllCategory } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceCategory',
  components: { CateCreateOrEdit },
  data () {
    return {
      categories: [],
      createOrEdit: false,
      editData: null
    }
  },
  methods: {
    async initCategories () {
      const { data } = await getAllCategory()
      if (data.code === '000000') {
        this.categories = data.data
      }
    },
    editCateHandle (item: any) {
      this.editData = item
      this.createOrEdit = true
    },
    delCateHandle (item: any) {
      this.$confirm('确认删除该数据项吗？', '删除提示')
        .then(async () => {
          const { data } = await delCategory(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功!')
            await this.initCategories()
          }
        })
        .catch(() => {
          this.$message.info('取消删除！')
        })
    },
    cateCreateOrEditClose () {
      this.createOrEdit = false
      this.editData = null
      this.initCategories()
    }
  },
  created () {
    this.initCategories()
  }
})
</script>

<style lang="scss" scoped>

</style>
