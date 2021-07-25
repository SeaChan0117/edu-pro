<template>
  <div class="user">
    <el-card>
      <el-form size="small">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterObj.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="datePicker">
          <el-date-picker
            v-model="filterObj.datePicker"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initUsers">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        size="mini"
        :data="usersData"
        style="width: 100%;border-top: 1px solid #eeeeee">
        <el-table-column
          prop="id"
          label="用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="portrait"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <el-avatar size="small" :src="scope.row.portrait || defAvatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <span @click="changeStatus(scope.row)" class="disable-status"
                  :class="{enable: scope.row.status === 'ENABLE'}">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="changeStatus(scope.row)" size="mini">禁用</el-button>
            <el-button type="primary" size="mini" @click="allocRoleDialog(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>

      <br>
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

    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%">
      <el-select v-model="allocRoles" multiple placeholder="请选择" style="width: 100%">
        <el-option
          v-for="item in rolesOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allocUserRoles">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { forbidUser, getUsers } from '@/services/user'
import { allocateUserRoles, getAllRoles, getRoleByUserId } from '@/services/role'

export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      filterObj: {
        phone: '',
        datePicker: [],
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      usersData: [],
      defAvatar: '//www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg',
      loading: false,
      dialogVisible: false,
      allocRoles: [],
      rolesOptions: [],
      userIdForAlloc: ''
    }
  },
  methods: {
    async initUsers () {
      const startCreateTime = this.filterObj.datePicker && this.filterObj.datePicker.length && this.filterObj.datePicker[0] ? this.filterObj.datePicker[0] : ''
      const endCreateTime = this.filterObj.datePicker && this.filterObj.datePicker.length && this.filterObj.datePicker[1] ? this.filterObj.datePicker[1] : ''
      const { data } = await getUsers({
        phone: this.filterObj.phone,
        currentPage: this.filterObj.currentPage,
        pageSize: this.filterObj.pageSize,
        startCreateTime,
        endCreateTime
      })
      if (data.code === '000000') {
        this.usersData = data.data.records
        this.filterObj.total = data.data.total
      }
    },
    async changeStatus (user: any) {
      const { data } = await forbidUser(user.id)
      if (data.code === '000000') {
        this.$message.success('修改成功！')
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleSizeChange (val: number) {
      this.filterObj.pageSize = val
      this.initUsers()
    },
    handleCurrentChange (val: number) {
      this.filterObj.currentPage = val
      this.initUsers()
    },
    async allocRoleDialog (user: any) {
      this.userIdForAlloc = user.id
      const userRoles = await getRoleByUserId(user.id)
      if (userRoles.data.code === '000000') {
        this.allocRoles = userRoles.data.data.map((item: any) => item.id)
      }
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.rolesOptions = data.data
      }
      this.dialogVisible = true
    },
    async allocUserRoles () {
      const { data } = await allocateUserRoles({
        userId: this.userIdForAlloc,
        roleIdList: this.allocRoles
      })
      if (data.code === '000000') {
        this.$message.success('分配成功！')
      } else {
        this.$message.error(data.mesg)
      }
      this.dialogVisible = false
    }
  },
  created () {
    this.initUsers()
  }
})
</script>

<style lang="scss" scoped>
.el-form-item {
  display: inline-block;
  margin-right: 10px;
}

.disable-status {
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #FF6B6B;
}

.enable {
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #51CF66;
}

.el-pagination {
  text-align: right;
}
</style>
