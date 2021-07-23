<template>
  <div class="alloc-resource"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllocResource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
