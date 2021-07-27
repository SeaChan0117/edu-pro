<template>
  <el-form :model="lesson" size="small" label-width="100px" v-loading="loading">
    <el-form-item label="课程名称" prop="courseName">
      <el-input v-model="lesson.courseName" disabled></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="sectionName">
      <el-input v-model="lesson.sectionName" disabled></el-input>
    </el-form-item>
    <el-form-item label="课时名称" prop="theme">
      <el-input v-model="lesson.theme" placeholder="请输入课时名称"></el-input>
    </el-form-item>
    <el-form-item label="课时时长" prop="duration">
      <el-input type="number" v-model="lesson.duration" placeholder="请输入课时时长">
        <template slot="append">分钟</template>
      </el-input>
    </el-form-item>
    <el-form-item label="是否开放试听" prop="isFree">
      <el-switch
        v-model="lesson.isFree"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </el-form-item>
    <el-form-item label="课时排序" prop="orderNum">
      <el-input type="number" v-model="lesson.orderNum" placeholder="请输入课时排序">
        <template slot="append">数字控制排序，数字越大越靠后</template>
      </el-input>
    </el-form-item>

    <div style="text-align: right">
      <el-button size="small" @click="$emit('cancel')">取消</el-button>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { getBySectionId } from '@/services/section'
import { getLessonById, saveOrUpdateLesson } from '@/services/course'

export default {
  name: 'CreateOrEditLesson',
  props: {
    course: {
      type: Object,
      default: () => ({})
    },
    sectionId: {
      type: [Number, String],
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    lessonId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      lesson: {
        courseName: '',
        sectionName: '',
        theme: '',
        duration: '',
        isFree: false,
        orderNum: undefined,
        courseId: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      this.loading = true
      const { data } = await saveOrUpdateLesson(this.lesson)
      if (data.code === '000000') {
        this.$message.success(`课时${this.isEdit ? '编辑' : '新增'}成功！`)
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
      this.loading = false
    },
    async initSection () {
      const { data } = await getBySectionId(this.sectionId)
      if (data.code === '000000') {
        this.lesson.sectionId = data.data.id
        // this.lesson.sectionName = data.data.sectionName
        this.$set(this.lesson, 'sectionName', data.data.sectionName)
      }
      this.lesson.courseId = this.course.id
      // this.lesson.courseName = this.course.courseName
      this.$set(this.lesson, 'courseName', this.course.courseName)
    },
    async initLesson () {
      const { data } = await getLessonById(this.lessonId)
      if (data.code === '000000') {
        this.lesson = data.data
      }
      await this.initSection()
    }
  },
  created () {
    this.isEdit ? this.initLesson() : this.initSection()
  }
}
</script>

<style scoped>

</style>
