<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}分类`"
    :visible.sync="show"
    width="600px"
    :before-close="handleClose">
    <el-form :model="category" label-width="120px">
      <el-form-item label="名称" size="small">
        <el-input v-model="category.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="排序" size="small">
        <el-input type="number" v-model="category.sort" placeholder="排序" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose" size="mini">取 消</el-button>
    <el-button type="primary" @click="submitAddOrEdit" size="mini">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrderUpdateCate } from '@/services/resource'

export default Vue.extend({
  name: 'CateCreateOrEdit',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isEdit: false,
      category: {
        id: '',
        name: '',
        sort: 0
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    async submitAddOrEdit () {
      const { data } = await saveOrderUpdateCate(this.category)
      if (data.code === '000000') {
        this.$message.success(`${this.isEdit ? '编辑' : '添加'}成功！`)
        this.handleClose()
      } else {
        this.$message.error(data.mesg)
      }
    }
  },
  created () {
    this.isEdit = !!this.editData
    this.category = this.editData || this.category
  }
})
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 400px;
}
</style>
