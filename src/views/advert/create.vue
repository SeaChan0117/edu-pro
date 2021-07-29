<template>
  <create-or-edit-ad />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditAd from '@/views/advert/components/CreateOrEditAd.vue'

export default Vue.extend({
  name: 'create',
  components: { CreateOrEditAd }
})
</script>

<style lang="scss" scoped>

</style>
