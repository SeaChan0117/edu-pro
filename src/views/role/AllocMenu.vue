<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        ref="menuTree"
        show-checkbox
        default-expand-all
        :default-checked-keys="curRoleMenus"
        node-key="id"
        :data="menuNodeList"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
      </el-tree>
      <div style="text-align: center">
        <el-button @click="resetMenuTree">清空</el-button>
        <el-button type="primary" @click="submitHandle">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { allocateRoleMenus, getMenuNodeList, getMenusByRoleId } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menuNodeList: [],
      curRoleMenus: [] as Array<string | number>,
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  methods: {
    handleNodeClick (data: any) {
      console.log(data)
    },
    async initMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menuNodeList = data.data
      }
    },
    async initMenusForCurRole () {
      const { data } = await getMenusByRoleId(this.roleId)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      }
    },
    async submitHandle () {
      const menuIdList = (this.$refs.menuTree as Tree).getCheckedKeys()
      console.log(menuIdList)
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功！')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    },
    getCheckedKeys (arr: any) {
      arr.forEach((item: any) => {
        if (item.selected && !item.subMenuList) {
          this.curRoleMenus = [...this.curRoleMenus, item.id]
        }
        // 子节点未完全勾选时，后台数据会把父节点也勾选，此处判断处理
        if (item.selected && item.subMenuList && item.subMenuList.every((_item: any) => _item.selected)) {
          this.curRoleMenus = [...this.curRoleMenus, item.id]
        }
        if (item.subMenuList && item.subMenuList.length) {
          this.getCheckedKeys(item.subMenuList)
        }
      })
    },
    resetMenuTree () {
      (this.$refs.menuTree as Tree).setCheckedKeys([])
    }
  },
  created () {
    this.initMenuNodeList()
    this.initMenusForCurRole()
  }
})
</script>

<style lang="scss" scoped>

</style>
