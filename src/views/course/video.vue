<template>
  <el-card class="video">
    <el-form :model="lesson"></el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getLessonById } from '@/services/course'

export default Vue.extend({
  name: 'video',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      lesson: null
    }
  },
  methods: {
    async initLesson () {
      // const { data } = await getLessonById(this.lessonId)
      // if (data.code === '000000') {
      //   this.lesson = data.data
      // }
      console.log(this.lesson)
    }
  },
  created () {
    this.initLesson()
  }
})
</script>

<style lang="scss" scoped>

</style>
