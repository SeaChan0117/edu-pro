<template>
  <div class="course-img">
    <el-progress
      style="position: absolute;z-index: 2;top: 1px;left: 1px;background-color: #ffffff"
      v-if="isUploading"
      type="circle"
      :width="178"
      :status="progress === 100 ? 'success' : undefined"
      :percentage="progress">
    </el-progress>
    <el-upload
      action=""
      class="avatar-uploader"
      :show-file-list="false"
      :http-request="uploadImg"
      :before-upload="beforeAvatarUpload">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadImg } from '@/services/course'

export default Vue.extend({
  name: 'CourseImg',
  props: {
    value: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      progress: 0,
      isUploading: false
    }
  },
  methods: {
    async uploadImg (options: any) {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadImg(fd, (e) => {
        this.progress = Math.floor(e.loaded / e.total * 100)
        console.log(this.progress)
      })
      if (data.code === '000000') {
        this.$emit('input', data.data.name)
      } else {
        this.$message.error(data.mesg)
      }
      this.isUploading = false
    },
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
