<template>
  <div class="alloc-resource">
    <el-card>
      <div class="content">
        <div v-for="cate in cateNodes" :key="cate.id">
          <el-row class="cate">
            <el-checkbox :indeterminate="cate.indeterminate" :label="cate.name" :value="cate.id" v-model="cate.selected"
                         @change="cateChange(cate)"></el-checkbox>
          </el-row>
          <el-row class="resource">
            <el-col :span="8" v-for="resource in cate.resourceList" :key="resource.id" style="padding: 4px 0">
              <el-checkbox :label="resource.name" :value="resource.id" v-model="resource.selected"
                           @change="resChange(resource)"></el-checkbox>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="text-align: center;margin-top: 15px">
        <el-button @click="reset">清空</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { allocateRoleResources, getAllCategory, getAllResource, getRoleResources } from '@/services/resource'

export default Vue.extend({
  name: 'AllocResource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      categoryNodes: [],
      cateNodes: []
    }
  },
  methods: {
    async getRoleResourcesFn () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        this.cateNodes = data.data
        this.cateNodes.forEach(cate => {
          this.allChecked(cate, false)
        })
      }
    },
    async getCategoryList () {
      const { data } = await getAllCategory()
      if (data.code === '000000') {
        this.categoryNodes = data.data
        await this.getResourceList()
      }
    },
    async getResourceList () {
      const { data } = await getAllResource()
      if (data.code === '000000') {
        const resourceList = data.data
        const resObj = this.arr2obj(resourceList)
        this.categoryNodes.forEach((item: any) => {
          this.$set(item, 'resourceList', resObj[item.id])
        })
      }
    },
    cateChange (cate: any) {
      cate.resourceList.forEach((item: any) => {
        item.selected = cate.selected
      })
      this.allChecked(cate, false)
    },
    resChange (val: any) {
      const cateId = val.categoryId
      const cate = this.cateNodes.find((item: any) => item.id === cateId) as any
      this.allChecked(cate, false)
    },
    allChecked (cate: any, isReset: boolean) {
      if (!cate || !cate.resourceList) return
      let checkedCount = 0
      cate.resourceList.forEach((item: any) => {
        item.selected = isReset ? false : item.selected
        checkedCount = item.selected ? ++checkedCount : checkedCount
      })
      cate.selected = checkedCount === cate.resourceList.length
      cate.indeterminate = checkedCount > 0 && checkedCount !== cate.resourceList.length
    },
    arr2obj (arr: any) {
      const obj = {} as any
      arr.forEach((item: any) => {
        item.checked = false
        obj[item.categoryId] = obj[item.categoryId] || []
        obj[item.categoryId].push(item)
      })
      return obj
    },
    reset () {
      this.cateNodes.forEach((item: any) => {
        item.selected = false
        this.allChecked(item, true)
      })
    },
    async submit () {
      const resourceIdList = new Set()
      this.cateNodes.forEach((item: any) => {
        item.resourceList.forEach((res: any) => {
          if (res.selected) {
            resourceIdList.add(res.id)
          }
        })
      })
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: [...resourceIdList]
      })
      if (data.code === '000000') {
        this.$message.success('资源分配成功！')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    }
  },
  created () {
    this.getRoleResourcesFn()
    // this.getCategoryList()
  }
})
</script>

<style lang="scss" scoped>
.alloc-resource {
  .content {
    border: 1px solid #cccccc;

    .cate {
      background: rgb(242, 246, 252);
      padding: 20px;
    }

    .resource {
      padding: 20px;
    }
  }
}
</style>
