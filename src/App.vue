<template>
  <div id="app">
    <!--    跟路由出口-->
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data () {
    return {
      foo: {}
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
