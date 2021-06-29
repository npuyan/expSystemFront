<template>
  <div>
    <a-tabs type="card" @tabClick="callback">
      <a-tab-pane
        :key="courseitem.courseId"
        :tab="courseitem.courseName"
        v-for="courseitem in courselist"
      >
        <div v-if="clickflag == 1">
          <util-table
            :data="data"
            :columns="columns"
            :columns-name="columnsName"
            :data-id-name="dataIdName"
            :recv-param="parameter"
            :fetch-url="fetchUrl"
            :del-url="delUrl"
            :save-url="saveUrl"
          >
          </util-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import UtilTable from '../teacher/utilTable'
const columnsName = [
  'labName',
  'courseId',
  'courseName',
  'envId',
  'remarks',
  'sectionId'
]
const columns = [
  {
    title: '实验名称',
    dataIndex: 'labName',
    sorter: false,
    scopedSlots: { customRender: 'labName' }
  },
  {
    title: '关联课程id',
    dataIndex: 'courseId',
    sorter: false,
    scopedSlots: { customRender: 'courseId' }
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    sorter: false,
    scopedSlots: { customRender: 'courseName' }
  },
  {
    title: '环境Id',
    dataIndex: 'envId',
    sorter: false,
    scopedSlots: { customRender: 'envId' }
  },
  {
    title: '实验描述',
    dataIndex: 'remarks',
    sorter: false,
    scopedSlots: { customRender: 'remarks' }
  },
  {
    title: '第几次实验',
    dataIndex: 'sectionId',
    sorter: false,
    scopedSlots: { customRender: 'sectionId' }
  },
  {
    title: '删除',
    dataIndex: 'delete',
    scopedSlots: { customRender: 'delete' }
  },
  {
    title: '详细信息',
    dataIndex: 'info',
    scopedSlots: {customRender: 'info'}
  }
]
export default {
  name: 'labManage',
  components: { UtilTable },
  data () {
    // this.cacheData = data.map(item => ({...item}))
    return {
      courselist: [],
      clickflag: 0,
      data: [],
      loading: false,
      count: 0,
      editingKey: '',
      columns,
      columnsName,
      /* 此处必须是后端传过来的数据的逐渐名称，否则前端无法进行识别 */
      dataIdName: 'labId',
      parameter: { courseid: 0 },
      /* 已完成1,2,3 */
      fetchUrl: 'api/getlabbycourseid',
      delUrl: 'api/delcourselabbyid',
      saveUrl: 'api/updatecourselab'
    }
  },
  methods: {
    callback (key) {
      console.log('callback')
      console.log(key)

      this.parameter.courseid = key
    }
  },
  mounted () {
    console.log('mounted!')

    var _this = this
    _this
      .postRequest('api/getcoursebyteacher', {
        username: this.$store.state.userName
      })
      .then((resp) => {
        console.log('返回数据')
        console.log(resp)
        this.courselist = resp
        this.clickflag = 1
        if (this.courselist.length > 0) {
          this.parameter.courseid = this.courselist[0].courseId
        }
      })
  }
}
</script>

<style scoped>
</style>
