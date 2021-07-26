<template>
  <div class="course-list">
    <el-card>
      <el-form size="small" label-width="80px">
        <el-form-item label="课程名称" prop="phone">
          <el-input v-model="filterObj.courseName" placeholder="课程名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="datePicker">
          <el-select v-model="filterObj.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initCourses" :disabled="loading">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-plus" :disabled="loading"
                     @click="$router.push({name: 'course-create'})">新建课程
          </el-button>
        </el-form-item>
      </el-form>
      <br>
      <el-table
        v-loading="loading"
        size="mini"
        :data="coursesData"
        style="width: 100%;border-top: 1px solid #eeeeee">
        <el-table-column
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price ? `￥${scope.row.price}` : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span
              class="down-status"
              :class="{'up-status': scope.row.status}"
              :title="scope.row.status === 1 ? '上架' : '下架'"
              @click="changeStatus(scope.row)">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="mini"
                :type="scope.row.status === 0 ? 'success' : 'danger'"
                @click="changeStatus(scope.row)"
              >
                {{ scope.row.status === 0 ? '上架' : '下架' }}
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="$router.push({
                name: 'course-edit',
                 params: {
                  courseId: scope.row.id
                 }
                })">编辑</el-button>
              <el-button size="mini" type="primary">内容管理</el-button>
            </span>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { changeCourseStatus, pageQueryCourse } from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      filterObj: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      statusOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '上架',
          value: 1
        },
        {
          label: '下架',
          value: 0
        }
      ],
      coursesData: [],
      loading: false
    }
  },
  methods: {
    async initCourses () {
      this.loading = true
      const { data } = await pageQueryCourse(this.filterObj)
      if (data.code === '000000') {
        this.coursesData = data.data.records
        this.filterObj.total = data.data.total
      }
      this.loading = false
    },
    handleSizeChange (val: number) {
      this.filterObj.pageSize = val
      this.initCourses()
    },
    handleCurrentChange (val: number) {
      this.filterObj.currentPage = val
      this.initCourses()
    },
    async changeStatus (course: any) {
      const status = parseInt(course.status) === 1 ? 0 : 1
      const { data } = await changeCourseStatus({
        courseId: course.id,
        status
      })
      if (data.code === '000000') {
        course.status = status
      }
    }
  },
  created () {
    this.initCourses()
  }
})
</script>

<style lang="scss" scoped>
.el-form-item {
  display: inline-block;
  margin-right: 10px;
}

.down-status {
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #FF6B6B;
}

.up-status {
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
