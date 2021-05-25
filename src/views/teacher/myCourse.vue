<template>
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
</template>

<script>
import UtilTable from '../teacher/utilTable'
const columnsName = [
  'courseName', 
  'author', 
  'type', 
  'tag', 
  'time', 
  'picture', 
  'createTime',
]
const columns = [
  {
    title: '课程名',
    dataIndex: 'courseName',
    sorter: false,
    scopedSlots: {customRender: 'courseName'}
  },
  {
    title: '作者',
    dataIndex: 'author',
    sorter: false,
    scopedSlots: {customRender: 'author'}
  },
  {
    title: '类型',
    dataIndex: 'type',
    scopedSlots: {customRender: 'type'}
  }, {
    title: '标志',
    dataIndex: 'tag',
    scopedSlots: {customRender: 'tag'}
  },
  {
    title: '课程时间',
    dataIndex: 'time',
    scopedSlots: {customRender: 'time'}
  },
  {
    title: '标志',
    dataIndex: 'tag',
    scopedSlots: {customRender: 'tag'}
  },
  {
    title: '图片路径',
    dataIndex: 'picture',
    scopedSlots: {customRender: 'picture'}
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    scopedSlots: {customRender: 'createTime'}
  },
  {
    title: '删除',
    dataIndex: 'delete',
    scopedSlots: {customRender: 'delete'}
  },
  {
    title: '结束',
    dataIndex: 'finsh',
    scopedSlots: {customRender: 'finsh'}
  },
  , {
    title: '详细信息',
    dataIndex: 'info',
    scopedSlots: {customRender: 'info'}
  }
]
export default {
  name: 'courseManage',
  components: {UtilTable},
  data () {
    // this.cacheData = data.map(item => ({...item}))
    return {
      data: [],
      loading: false,
      count: 0,
      editingKey: '',
      columns,
      columnsName,
      dataIdName: 'courseId',
      parameter: {'username': this.$store.state.userName},
      /* 完成1,2,3 */
      fetchUrl: 'api/getcoursebyteacher',
      delUrl: 'api/delcoursebyid',
      saveUrl: 'api/updatecourse'
    }
  }
}
</script>

<style scoped>

</style>
