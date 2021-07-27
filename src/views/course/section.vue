<template>
  <el-card class="section" v-loading="loading">
    <div slot="header" class="clearfix">
      <el-button type="text" icon="el-icon-back" size="mini" @click="$router.back()">返回</el-button>
      <el-divider direction="vertical"/>
      <span>{{ course.courseName }}</span>
      <el-button
        style="float: right;"
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="sectionDialogShow = true"
      >
        添加阶段
      </el-button>
    </div>

    <el-tree :data="sectionData" :props="defaultProps" @node-click="handleNodeClick">
      <div class="section-row" slot-scope="{node, data}">
        <span>
          {{ node.label }}
        </span>
        <span v-if="data.sectionName" class="actions">
          <el-button size="mini" @click.stop="editSectionHandle(data)">编辑</el-button>
          <el-button type="primary" size="mini" @click.stop="createLessonHandle(data)">添加课时</el-button>
          <el-select
            v-model="data.status"
            size="mini"
            @change="(val) => {
              changeSectionStatus(val, data)
            }"
            style="width: 90px;margin-left: 10px;">
            <el-option
              v-for="sta in status"
              :key="sta.code"
              :value="sta.code"
              :label="sta.label"
            >
            </el-option>
          </el-select>
        </span>
        <span v-else class="actions">
          <el-button size="mini" @click="editLessonHandle(data)">编辑</el-button>
          <el-button type="success" size="mini">上传视频</el-button>
          <el-select
            v-model="data.status"
            size="mini"
            @change="(val) => {
              changeLessonStatus(val, data)
            }"
            style="width: 90px;margin-left: 10px;">
            <el-option
              v-for="sta in status"
              :key="sta.code"
              :value="sta.code"
              :label="sta.label"
            >
            </el-option>
          </el-select>
        </span>
      </div>
    </el-tree>

    <el-dialog
      title="章节信息"
      :visible.sync="sectionDialogShow"
      v-if="sectionDialogShow"
      :before-close="(done) => {
        this.editSectionFlag = false
        this.editSectionId = ''
        done()
      }"
      width="500px">
      <create-or-edit-section
        :is-edit="editSectionFlag"
        :sectionId="editSectionId"
        :course="course"
        @cancel="sectionDialogShow = false"
        @success="onSuccess"
      />
    </el-dialog>

    <el-dialog
      title="课时基本信息"
      :visible.sync="lessonDialogShow"
      v-if="lessonDialogShow"
      :before-close="(done) => {
        this.editLessonFlag = false
        this.editLessonId = ''
        done()
      }"
      width="500px">
      <create-or-edit-lesson
        :is-edit="editLessonFlag"
        :sectionId="sectionIdForLesson"
        :lessonId="editLessonId"
        :course="course"
        @cancel="lessonDialogShow = false"
        @success="onSuccess2"
      />
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getBySectionId, getSections, saveOrUpdateSection } from '@/services/section'
import { getCourseById, getLessonById, saveOrUpdateLesson } from '@/services/course'
import CreateOrEditSection from './components/CreateOrEditSection.vue'
import CreateOrEditLesson from '@/views/course/components/CreateOrEditLesson.vue'

export default Vue.extend({
  name: 'section',
  components: { CreateOrEditLesson, CreateOrEditSection },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      course: {},
      sectionDialogShow: false,
      sectionData: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (node: any) {
          return node.sectionName || node.theme
        }
      },
      status: [
        {
          code: 0,
          label: '已隐藏'
        },
        {
          code: 1,
          label: '待更新'
        },
        {
          code: 2,
          label: '已更新'
        }
      ],
      editSectionFlag: false,
      editSectionId: '',
      lessonDialogShow: false,
      sectionIdForLesson: '',
      editLessonFlag: false,
      editLessonId: '',
      loading: false
    }
  },
  methods: {
    handleNodeClick (data: any) {
      console.log(data)
    },
    async initSectionData () {
      this.loading = true
      const { data } = await getSections(this.courseId)
      if (data.code === '000000') {
        this.sectionData = data.data
      }
      this.loading = false
    },
    async getCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },
    onSuccess () {
      this.sectionDialogShow = false
      this.initSectionData()
    },
    onSuccess2 () {
      this.lessonDialogShow = false
      this.initSectionData()
    },
    changeSectionStatus (val: any, section: any) {
      const status = (this.status.find((item: any) => item.code === val) as any).label
      this.$confirm(`确定将状态改为 ${status} 吗？`, '修改状态')
        .then(async () => {
          const { data } = await saveOrUpdateSection({
            id: section.id,
            status: val
          })
          if (data.code === '000000') {
            this.$message.success('状态更新成功！')
          }
        })
        .catch(async () => {
          const { data } = await getBySectionId(section.id)
          section.status = data.data.status
          this.$message.info('取消')
        })
    },
    editSectionHandle (section: any) {
      this.editSectionFlag = true
      this.sectionDialogShow = true
      this.editSectionId = section.id
    },
    createLessonHandle (section: any) {
      this.sectionIdForLesson = section.id
      this.lessonDialogShow = true
    },
    changeLessonStatus (val: any, lesson: any) {
      const status = (this.status.find((item: any) => item.code === val) as any).label
      this.$confirm(`确定将状态改为 ${status} 吗？`, '修改状态')
        .then(async () => {
          const { data } = await saveOrUpdateLesson({
            id: lesson.id,
            status: val
          })
          if (data.code === '000000') {
            this.$message.success('状态更新成功！')
          }
        })
        .catch(async () => {
          const { data } = await getLessonById(lesson.id)
          lesson.status = data.data.status
          this.$message.info('取消')
        })
    },
    editLessonHandle (lesson: any) {
      this.sectionIdForLesson = lesson.sectionId
      this.editLessonId = lesson.id
      this.lessonDialogShow = true
      this.editLessonFlag = true
    }
  },
  created () {
    this.initSectionData()
    this.getCourse()
  }
})
</script>

<style lang="scss" scoped>
.section {
  .section-row {
    padding: 8px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebeef5;

    .actions {
    }
  }

  ::v-deep .el-tree-node__content {
    height: auto;
  }
}
</style>
