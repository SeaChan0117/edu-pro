<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadImg } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isMounted: false
    }
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      editor.config.onchange = (val: string) => {
        this.$emit('input', val)
      }
      editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImg(fd, (e) => {
          console.log(e)
        })
        if (data.code === '000000') {
          insertImgFn(data.data.name)
        }
      }
      editor.create()
      editor.txt.html(this.value)
    }
  },
  mounted () {
    this.isMounted = true
  },

  watch: {
    value: {
      handler () {
        this.isMounted && this.initEditor()
      },
      deep: true
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
