<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}角色`"
    :visible.sync="show"
    width="600px"
    :before-close="handleClose">
    <el-form :model="role" label-width="120px" size="small">
      <el-form-item label="角色名称">
        <el-input v-model="role.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code" placeholder="角色编码" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :rows="4" v-model="role.description" placeholder="描述" clearable></el-input>
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
import { addOrUpdateRole } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEdit',
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
      role: {
        id: '',
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    async submitAddOrEdit () {
      const { data } = await addOrUpdateRole(this.role)
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
    this.role = this.editData || this.role
  }
})

</script>

<style lang="scss" scoped>
.el-form-item {
  width: 400px;
}
</style>
