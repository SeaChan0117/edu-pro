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
import { getBySectionId, saveOrUpdateSection } from '@/services/section'

export default Vue.extend({
  name: 'CreateOrEditSection',
  props: {
    course: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    sectionId: {
      type: [String, Number],
      default: ''
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
    async initSection () {
      const { data } = await getBySectionId(this.sectionId)
      if (data.code === '000000') {
        this.section = data.data
      }
      this.section.courseId = this.course.id
      this.section.courseName = this.course.courseName
    },
    async submit () {
      const { data } = await saveOrUpdateSection(this.section)
      if (data.code === '000000') {
        this.$message.success(`章节${this.isEdit ? '编辑' : '新增'}成功！`)
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
    }
  },
  created () {
    this.isEdit && this.initSection()
  }
})
</script>

<style lang="scss" scoped>

</style>
