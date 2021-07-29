<template>
  <div class="advert">
    <advert-list/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdvertList from '@/views/advert/components/AdvertList.vue'

export default Vue.extend({
  name: 'AdvertIndex',
  components: { AdvertList }
})
</script>

<style lang="scss" scoped>

</style>
