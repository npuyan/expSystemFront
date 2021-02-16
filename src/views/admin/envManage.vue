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
  'envName', 'remark', 'nodeName', 'cpu', 'memsize', 'createTime',
  'creatorId', 'imageId'
]
const columns = [
  {
    title: '环境名称',
    dataIndex: 'envName',
    scopedSlots: {customRender: 'envName'}
  },
  {
    title: '环境描述',
    dataIndex: 'remark',
    scopedSlots: {customRender: 'remark'}
  },
  {
    title: '分配节点名称',
    dataIndex: 'nodeName',
    scopedSlots: {customRender: 'nodeName'}
  },
  {
    title: 'CPU大小',
    dataIndex: 'cpu',
    scopedSlots: {customRender: 'cpu'}
  },
  {
    title: '内存大小',
    dataIndex: 'memsize',
    scopedSlots: {customRender: 'memsize'}
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    scopedSlots: {customRender: 'createTime'}
  },
  {
    title: '创建人ID',
    dataIndex: 'creatorId',
    scopedSlots: {customRender: 'creatorId'}
  },
  {
    title: '镜像ID',
    dataIndex: 'imageId',
    scopedSlots: {customRender: 'imageId'}
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
  name: 'envManage',
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
      dataIdName: 'envId',
      /* 已完成1，2 3 */
      fetchUrl: 'api/getallcourseenv',
      delUrl: 'api/delcourseenvbyid',
      saveUrl: 'api/updatecourseenv'
    }
  }
}
</script>

<style scoped>

</style>
