<template>
  <create-or-edit-ad :advertId="advertId"/>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditAd from '@/views/advert/components/CreateOrEditAd.vue'

export default Vue.extend({
  name: 'edit',
  components: { CreateOrEditAd },
  props: {
    advertId: {
      type: [Number, String],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
