<template>
  <create-or-edit :is-edit="true" :course-id="courseId" />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from '@/views/course/components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'edit',
  components: { CreateOrEdit },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
