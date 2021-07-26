<template>
  <el-card class="create-course">
    <div slot="header" class="clearfix">
      <el-button type="text" icon="el-icon-back" size="mini" @click="$router.back()">返回</el-button>
      <el-divider direction="vertical"/>
      <span>新增课程</span>
    </div>
    <el-steps
      :active="curStep"
      process-status="process"
      finish-status="finish"
      simple>
      <el-step
        style="cursor: pointer"
        v-for="(step, idx) in steps"
        :key="idx"
        :title="step" icon="el-icon-edit"
        @click.native="curStep = idx">
      </el-step>
    </el-steps>
    <br>
    <el-form :model="course" size="small" label-width="100px">
      <div v-show="curStep===0">
        <el-form-item label="名称" prop="courseName">
          <el-input v-model="course.courseName" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input v-model="course.brief" placeholder="课程一句话简介"></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名" prop="teacherName">
          <el-input v-model="course.teacherDTO.teacherName" placeholder="讲师姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="course.teacherDTO.position" placeholder="讲师职位"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介" prop="description">
          <el-input v-model="course.teacherDTO.description" placeholder="讲师简介"></el-input>
        </el-form-item>
        <el-form-item label="课程概述" prop="previewFirstField">
          <el-input type="textarea" v-model="course.previewFirstField" placeholder="课程预览一"></el-input>
        </el-form-item>
        <el-form-item prop="previewSecondField">
          <el-input type="textarea" v-model="course.previewSecondField" placeholder="课程预览二"></el-input>
        </el-form-item>
        <el-form-item label="课程排序" prop="sortNum">
          <el-input type="number" v-model="course.sortNum" placeholder="课程排序">
            <template slot="append">数字控制排序，数字越大越靠后</template>
          </el-input>
        </el-form-item>
      </div>
      <div v-show="curStep===1">
        <el-form-item label="课程封面" prop="courseListImg">
          <course-img v-model="course.courseListImg"/>
        </el-form-item>
        <el-form-item label="解锁封面" prop="courseImgUrl">
          <course-img v-model="course.courseImgUrl"/>
        </el-form-item>
      </div>
      <div v-show="curStep===2">
        <el-form-item label="售卖价格" prop="discounts">
          <el-input type="number" v-model="course.discounts" placeholder="售卖价格">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="原价" prop="price">
          <el-input type="number" v-model="course.price" placeholder="原价">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input type="number" v-model="course.sales" placeholder="销量">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动标签" prop="discountsTag">
          <el-input v-model="course.discountsTag" placeholder="活动标签">
          </el-input>
        </el-form-item>
      </div>
      <div v-show="curStep===3">
        <el-form-item label="秒杀活动" prop="activityCourse">
          <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime" v-if="course.activityCourse">
          <el-date-picker
            v-model="course.activityCourseDTO.beginTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" v-if="course.activityCourse">
          <el-date-picker
            v-model="course.activityCourseDTO.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀价" prop="amount" v-if="course.activityCourse">
          <el-input type="number" v-model="course.activityCourseDTO.amount" placeholder="秒杀价">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="秒杀库存" prop="stock" v-if="course.activityCourse">
          <el-input type="number" v-model="course.activityCourseDTO.stock" placeholder="秒杀库存">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
      </div>
      <div v-show="curStep===4">
        <el-form-item label="课程详情" prop="courseDescriptionMarkDown">
<!--          <el-input type="textarea" v-model="course.courseDescriptionMarkDown"></el-input>-->
          <text-editor v-model="course.courseDescriptionMarkDown" />
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
          <el-switch
            v-model="course.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" size="mini" @click="submit">保存</el-button>
        </div>
      </div>
    </el-form>
    <div style="text-align: center">
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-next"
        @click="curStep < 4 ? curStep++ : ''"
        v-if="curStep !== 4"
      >
        下一步
      </el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImg from '@/views/course/components/CourseImg.vue'
import { createOrUpdate, getCourseById } from '@/services/course'
import TextEditor from '@/components/TextEditor/index.vue'

export default Vue.extend({
  name: 'CreateOrEdit',
  components: { CourseImg, TextEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      curStep: 0,
      steps: ['基本信息', '课程封面', '销售信息', '秒杀活动', '课程详情'],
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: '',
        discounts: '',
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: '',
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: '',
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: '',
          stock: ''
        },
        autoOnlineTime: ''
      },
      imageUrl: ''
    }
  },
  methods: {
    async submit () {
      const { data } = await createOrUpdate(this.course)
      if (data.code === '000000') {
        this.$message.success('操作成功！')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    },
    async initCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        data.data.activityCourseDTO = data.data.activityCourseDTO || {
          beginTime: '',
          endTime: '',
          amount: '',
          stock: ''
        }
        this.course = data.data
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.initCourse()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
