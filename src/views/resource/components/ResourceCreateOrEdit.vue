<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}资源`"
    :visible.sync="show"
    width="600px"
    :before-close="handleClose">
    <el-form :model="resource" label-width="120px">
      <el-form-item label="资源名称" size="small">
        <el-input v-model="resource.name" placeholder="资源名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="资源路径" size="small">
        <el-input v-model="resource.url" placeholder="资源路径" clearable></el-input>
      </el-form-item>
      <el-form-item label="资源分类" size="small">
        <el-select v-model="resource.categoryId" placeholder="全部" style="width: 280px" clearable>
          <el-option
            v-for="item in categories"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" size="small">
        <el-input type="textarea" :rows="4" v-model="resource.description" placeholder="描述" clearable></el-input>
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
import { saveOrUpdateResource } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      default: () => []
    },
    editResourceData: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      isEdit: false,
      resource: {
        id: '',
        name: '',
        url: '',
        categoryId: '',
        description: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.isEdit = false
      this.$emit('close')
    },
    async submitAddOrEdit () {
      const { data } = await saveOrUpdateResource(this.resource)
      if (data.code === '000000') {
        this.$message.success(`${this.isEdit ? '编辑' : '添加'}成功！`)
        this.handleClose()
      } else {
        this.$message.error(data.mesg)
      }
    }
  },
  created () {
    if (this.editResourceData) {
      this.isEdit = true
      this.resource = this.editResourceData
    }
  }
})
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 400px;
}
</style>
