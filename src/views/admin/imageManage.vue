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
  'imageId', 'imageName', 'version', 'path', 'createTime', 'creatoId'
]
const columns = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   sorter: true,
  //   width: '20%'
  // },
  {
    title: '镜像id',
    dataIndex: 'imageId',
    sorter: false,
    scopedSlots: {customRender: 'imageId'}
  },
  {
    title: '镜像名称',
    dataIndex: 'imageName',
    sorter: false,
    scopedSlots: {customRender: 'imageName'}
  },
  {
    title: '镜像版本号',
    dataIndex: 'version',
    sorter: false,
    scopedSlots: {customRender: 'version'}
  },
  {
    title: '镜像上传路径',
    dataIndex: 'path',
    sorter: false,
    scopedSlots: {customRender: 'path'}
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: false,
    scopedSlots: {customRender: 'createTime'}
  },
  {
    title: '创建人',
    dataIndex: 'creatoId',
    sorter: false,
    scopedSlots: {customRender: 'creatoId'}
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
  name: 'imageManage',
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
      /* 已完成 1,2,3 */
      fetchUrl: 'api/getallcourseimage',
      delUrl: 'api/delcourseimagebyid',
      saveUrl: 'api/updatecourseimage'
    }
  }
}
</script>

<style scoped>

</style>
