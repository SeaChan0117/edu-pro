<template>
  <el-card class="create-or-edit-ad" v-loading="loading">
    <el-form ref="form" :model="ad" size="small" label-width="100px" style="width: 50%">
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="ad.name" placeholder="请填写广告名称"></el-input>
      </el-form-item>
      <el-form-item label="广告位置" prop="spaceId">
        <el-select v-model="ad.spaceId" placeholder="请选择" clearable>
          <el-option
            v-for="item in spaces"
            :label="item.name"
            :value="item.id"
            :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="ad.startTime"
          type="datetime"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间" prop="endTime">
        <el-date-picker
          v-model="ad.endTime"
          type="datetime"
          placeholder="选择到期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线" prop="status">
        <el-switch v-model="ad.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="广告图片" prop="img">
        <course-img v-model="ad.img"/>
      </el-form-item>
      <el-form-item label="广告链接" prop="link">
        <el-input v-model="ad.link" placeholder="请填写广告链接"></el-input>
      </el-form-item>
      <el-form-item label="广告备注" prop="text">
        <el-input type="textarea" :rows="4" v-model="ad.text" placeholder="请填写广告备注信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="submit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdById, getAllAdSpace, saveOrUpdateAd } from '@/services/advert'
import CourseImg from '@/views/course/components/CourseImg.vue'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditAd',
  components: { CourseImg },
  props: {
    advertId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      ad: {},
      spaces: [],
      loading: false
    }
  },
  methods: {
    async initAd () {
      const { data } = await getAdById(this.advertId)
      if (data.success) {
        this.ad = data.content
      }
    },
    async getAllSpace () {
      const { data } = await getAllAdSpace()
      if (data.success) {
        this.spaces = data.content
      }
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    },
    async submit () {
      this.loading = true
      const { data } = await saveOrUpdateAd(this.ad)
      if (data.success) {
        this.$message.success('创建广告成功！')
        this.$router.back()
      } else {
        this.$message.error(data.message)
      }
      this.loading = false
    }
  },
  created () {
    this.getAllSpace()
    !!this.advertId && this.initAd()
  }
})
</script>

<style lang="scss" scoped>

</style>
