<template>
  <div>
    <a-tabs @tabClick="callback">
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
  'userName',
  'password',
  'phone',
  'email',
  'state',
  'userType'
]
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: false,
    scopedSlots: { customRender: 'username' }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    sorter: false,
    scopedSlots: { customRender: 'phone' }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    sorter: false,
    scopedSlots: { customRender: 'email' }
  },
  {
    title: '用户状态',
    dataIndex: 'state',
    sorter: false,
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    sorter: false,
    scopedSlots: { customRender: 'userType' }
  },
  {
    title: '删除',
    dataIndex: 'delete',
    scopedSlots: { customRender: 'delete' }
  },
  {
    title: '学习详情',
    dataIndex: 'info',
    scopedSlots: { customRender: 'info' }
  }
]
export default {
  name: 'studentManage',
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
      dataIdName: 'userId',
      parameter: { courseid: 0 },
      fetchUrl: 'api/getallstudentbycourse',
      delUrl: 'api/delUserById',
      saveUrl: 'api/updateuser',
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
        console.log('this courselist' + this.courselist.length)
        if (this.courselist.length > 0) {
          this.parameter.courseid = this.courselist[0].courseId
        }
      })
  }
}
</script>

<style scoped>
</style>
