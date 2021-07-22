<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加菜单</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option value="-1" label="无上级菜单"></el-option>
            <el-option
              v-for="menu in parentMenuList"
              :key="menu.id"
              :label="menu.name"
              :value="menu.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateMenu, getEditMenuInfo } from '@/services/menu.ts'

export default Vue.extend({
  name: 'MenuCreate',
  data () {
    return {
      form: {
        name: '123',
        href: '123',
        parentId: '-1',
        icon: '123',
        description: '123',
        shown: false,
        orderNum: 1
      },
      parentMenuList: []
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功！')
        this.$router.back()
      }
    },
    async getEditMenuInfoFn () {
      const { data } = await getEditMenuInfo()
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    }
  },
  created () {
    this.getEditMenuInfoFn()
  }
})
</script>

<style lang="scss" scoped>

</style>
