<template>
  <el-form :model="section" label-width="80px" size="small">
    <el-form-item label="课程名称" prop="courseName">
      <el-input v-model="section.courseName" disabled></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="sectionName">
      <el-input v-model="section.sectionName"></el-input>
    </el-form-item>
    <el-form-item label="章节排序" prop="orderNum">
      <el-input type="number" v-model="section.orderNum">
        <template slot="append">数字控制排序，数字越大越靠后</template>
      </el-input>
    </el-form-item>
    <el-form-item label="章节描述" prop="description">
      <el-input type="textarea" row="3" v-model="section.description"></el-input>
    </el-form-item>

    <div style="text-align: right">
      <el-button size="small" @click="$emit('cancel')">取消</el-button>
      <el-button size="small" type="primary" @click="submit">确定</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateSection } from '@/services/section'

export default Vue.extend({
  name: 'CreateOrEditSection',
  props: {
    course: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      section: {
        courseId: '',
        courseName: '',
        sectionName: '',
        description: '',
        orderNum: ''
      }
    }
  },
  methods: {
    async submit () {
      const { data } = await saveOrUpdateSection(this.section)
      if (data.code === '000000') {
        this.$message.success('章节新增成功！')
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
    }
  },
  created () {
    this.section.courseId = this.course.id
    this.section.courseName = this.course.courseName
  }
})
</script>

<style lang="scss" scoped>

</style>
