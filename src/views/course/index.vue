<template>
  <course-list />
</template>

<script lang="ts">
import Vue from 'vue'
import CourseList from '@/views/course/components/CourseList.vue'
export default Vue.extend({
  name: 'CourseIndex',
  components: {
    CourseList
  }
})
</script>

<style lang="scss" scoped>

</style>
