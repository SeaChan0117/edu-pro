<template>
  <el-card class="video" v-loading="loading" style="min-height: calc(100% - 2px)">
    <el-form :model="lesson" size="small" label-width="80px">
      <el-form-item label="课程" prop="courseName">
        <el-input v-model="lesson.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时" prop="theme">
        <el-input v-model="lesson.theme" disabled></el-input>
      </el-form-item>
      <el-form-item label="封面上传" prop="courseName">
        <el-upload
          action=""
          class="upload-demo"
          :http-request="()=>{}"
          :show-file-list="false"
          :on-change="changeImage">
          <el-button size="small" type="primary">选择封面</el-button>
        </el-upload>
        <p v-if="imageFile && imageFile.name">{{imageFile ? imageFile.name : ''}}</p>
      </el-form-item>
      <el-form-item label="视频上传" prop="courseName">
        <el-upload
          action=""
          class="upload-demo"
          :http-request="()=>{}"
          :show-file-list="false"
          :on-change="changeVideo">
          <el-button size="small" type="primary">选择视频</el-button>
        </el-upload>
        <p v-if="videoFile && videoFile.name">{{videoFile ? videoFile.name : ''}}</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="uploadHandle">开始上传</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
      <el-form-item label="上传进度" v-if="isUploading">
        <div style="margin-top: 8px">
          <el-progress
            :percentage="uploadProgress"
            :status="uploadProgress === 100 ? 'success' : undefined"
          ></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="转码进度" v-if="isCoding">
        <div style="margin-top: 8px">
          <el-progress
            :percentage="codeProgress"
            :status="codeProgress === 100 ? 'success' : undefined"
          ></el-progress>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourseById, getLessonById } from '@/services/course'
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunTransCode, aliyunTransCodePercent,
  aliyunVideoUploadAddressAdnAuth
} from '@/services/aliyun-uploader'

export default Vue.extend({
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      lesson: {} as any,
      uploader: {},
      imageUrl: '',
      loading: false,
      imageFile: null,
      videoFile: null as any,
      uploadAuthAndAddress: {} as any,
      uploadProgress: 0,
      isUploading: false,
      codeProgress: 0,
      isCoding: false
    }
  },
  methods: {
    async initLesson () {
      this.loading = true
      const { data } = await getLessonById(this.$route.query.lessonId)
      if (data.code === '000000') {
        this.lesson = data.data
        await this.initCourse()
      }
      this.loading = false
    },
    async initCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.$set(this.lesson, 'courseName', data.data.courseName)
      }
    },
    initAliSDKUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // userID，必填，只需有值即可。
        userId: '16181399644448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          // 通过后端获取文件上传凭证
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await aliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageURL
            this.uploadAuthAndAddress = data.data
          } else {
            // 获取视频上传凭证
            const { data } = await aliyunVideoUploadAddressAdnAuth(uploadInfo.file.name, this.imageUrl)
            this.uploadAuthAndAddress = data.data
          }
          // 调用 uploader.setUploadAuthAndAddress
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            this.uploadAuthAndAddress.uploadAuth,
            this.uploadAuthAndAddress.uploadAddress,
            this.uploadAuthAndAddress.imageId || this.uploadAuthAndAddress.videoId
          )
          // 设置好上传凭证确认没问题，上传进度开始
          this.isUploading = true
        },
        // 文件上传成功
        onUploadSucceed: (uploadInfo: any) => {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: (uploadInfo: any, code: any, message: any) => {
          console.log('uploadInfo', code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log('onUploadProgress', totalSize, loadedPercent)
          if (!uploadInfo.isImage) {
            this.uploadProgress = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: (uploadInfo: any) => {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          console.log('onUploadEnd', uploadInfo)
          // 转码
          this.isCoding = true
          const { data } = await aliyunTransCode({
            lessonId: this.lesson.id,
            coverImageUrl: this.imageUrl,
            fileName: this.videoFile.name,
            fileId: this.uploadAuthAndAddress.videoId
          })
          console.log(data)
          const timer = setInterval(async () => {
            const { data } = await aliyunTransCodePercent(this.$route.query.lessonId)
            this.codeProgress = data.data
            if (data.data === 100) {
              clearInterval(timer)
            }
          }, 2000)
        }
      })
    },
    uploadHandle () {
      const uploader = this.uploader as any
      uploader.addFile(this.imageFile, null, null, null, '{"Vod": {}}')
      uploader.addFile(this.videoFile, null, null, null, '{"Vod": {}}')
      uploader.startUpload()
    },
    changeImage (file: any) {
      this.imageFile = file.raw
    },
    changeVideo (file: any) {
      this.videoFile = file.raw
    }
  },
  created () {
    this.initLesson()
    this.initAliSDKUploader()
  }
})
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 400px;
}
</style>
