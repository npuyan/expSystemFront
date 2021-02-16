<template>
  <util-table
    :data="data"
    :columns="columns"
    :columns-name="columnsName"
    :data-id-name="dataIdName"
    :fetch-url="fetchUrl"
    :del-url="delUrl"
    :save-url="saveUrl"
  >
  </util-table>
</template>

<script>
import UtilTable from './utilTable'
const columnsName = [
  'labName', 'courseId', 'courseName', 'envId', 'docPath', 'remarks', 'sectionId'
]
const columns = [
  {
    title: '实验名称',
    dataIndex: 'labName',
    sorter: false,
    scopedSlots: {customRender: 'labName'}
  },
  {
    title: '关联课程id',
    dataIndex: 'courseId',
    sorter: false,
    scopedSlots: {customRender: 'courseId'}
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    sorter: false,
    scopedSlots: {customRender: 'courseName'}
  },
  {
    title: '环境Id',
    dataIndex: 'envId',
    sorter: false,
    scopedSlots: {customRender: 'envId'}
  },
  {
    title: '实验文档路径',
    dataIndex: 'docPath',
    sorter: false,
    scopedSlots: {customRender: 'docPath'}
  },
  {
    title: '实验描述',
    dataIndex: 'remarks',
    sorter: false,
    scopedSlots: {customRender: 'remarks'}
  },
  {
    title: '第几次实验',
    dataIndex: 'sectionId',
    sorter: false,
    scopedSlots: {customRender: 'sectionId'}
  },
  {
    title: '删除',
    dataIndex: 'delete',
    scopedSlots: {customRender: 'delete'}
  }, {
    title: '编辑',
    dataIndex: 'edit',
    scopedSlots: {customRender: 'edit'}
  }
]
export default {
  name: 'labManage',
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
      dataIdName: 'id',
      /* 已完成1,2,3 */
      fetchUrl: 'api/getallcourselab',
      delUrl: 'api/delcourselabbyid',
      saveUrl: 'api/updatecourselab'
    }
  }
}
</script>

<style scoped>

</style>
