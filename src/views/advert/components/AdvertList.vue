<template>
  <el-card class="advert-list" v-loading="loading" style="min-height: calc(100% - 2px)">
    <div slot="header" class="clearfix">
      <el-button type="primary" size="small" @click="$router.push({name: 'advert-create'})">添加广告</el-button>
    </div>

    <el-table :data="advertTableData" style="width: 100%" border>
      <el-table-column
        prop="id"
        label="ID"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告名称"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="spaceId"
        label="广告位置"
        min-width="150"
      >
        <template slot-scope="scope">
          <span>{{ space(scope.row.spaceId) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="img"
        label="广告图片"
        width="130"
      >
        <template slot-scope="scope">
          <img
            style="cursor: pointer;"
            width="100px"
            height="80px"
            @click="() => {
              showImg = true
              imgUrl = scope.row.img
            }"
            :src="scope.row.img"/>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        min-width="200"
      >
        <template slot-scope="scope">
          <div>{{ `开始时间：${$dayjs(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss')}` }}</div>
          <div>{{ `到期时间：${$dayjs(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss')}` }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="上线/下线"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="(val) => {
              changeStatus(val, scope.row)
            }"
            :active-value="1"
            :inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="编辑"
        min-width="150"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editHandle(scope.row)">编辑</el-button>
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
      title="广告图片预览"
      :visible.sync="showImg"
      width="40%">
      <img style="width: 100%;" :src="imgUrl"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showImg = false">取 消</el-button>
    <el-button type="primary" @click="showImg = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, getAllAdSpace, updateAdStatus } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertList',
  data () {
    return {
      advertData: [],
      advertTableData: [],
      adSpaceArr: [] as any,
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      showImg: false,
      imgUrl: ''
    }
  },
  methods: {
    async initAdList () {
      this.loading = true
      const { data } = await getAdList()
      if (data.success) {
        this.advertData = data.content
      }
      this.page.total = this.advertData.length
      this.pageChange()
      this.loading = false
    },
    async getAllSpace () {
      const { data } = await getAllAdSpace()
      if (data.success) {
        this.adSpaceArr = data.content
      }
    },
    editHandle (ad: any) {
      console.log(ad)
      this.$router.push({
        name: 'advert-edit',
        params: {
          advertId: ad.id
        }
      })
    },
    changeStatus (status: any, ad: any) {
      this.$confirm('是否要修改上线/下线状态?', '修改提示')
        .then(async () => {
          const { data } = await updateAdStatus(ad.id, status)
          if (data.success) {
            this.$message.success('状态修改成功！')
          }
        })
        .catch(() => {
          ad.status = status === 1 ? 0 : 1
        })
    },
    handleSizeChange (val: number) {
      this.page.pageSize = val
      this.pageChange()
    },
    handleCurrentChange (val: number) {
      this.page.currentPage = val
      this.pageChange()
    },
    pageChange () {
      const start = (this.page.currentPage - 1) * this.page.pageSize
      let end = this.page.currentPage * this.page.pageSize
      end = end <= this.advertData.length ? end : this.advertData.length
      this.advertTableData = this.advertData.slice(start, end)
    }
  },
  created () {
    this.initAdList()
    this.getAllSpace()
  },
  computed: {
    space () {
      return (spaceId: any) => {
        const space = this.adSpaceArr.find((item: any) => item.id === spaceId)
        return space && space.name ? space.name : ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
}
</style>
