<template>
  <create-or-edit />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from '@/views/course/components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'create',
  components: { CreateOrEdit }
})
</script>

<style lang="scss" scoped>

</style>
