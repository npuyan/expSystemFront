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
  'userName', 'password', 'phone', 'email', 'state', 'userType'
]
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: false,
    scopedSlots: {customRender: 'username'}
  },
  // {
  //   title: '密码',
  //   dataIndex: 'password',
  //   sorter: false,
  //   scopedSlots: {customRender: 'password'}
  // },
  {
    title: '电话',
    dataIndex: 'phone',
    sorter: false,
    scopedSlots: {customRender: 'phone'}
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    sorter: false,
    scopedSlots: {customRender: 'email'}
  },
  {
    title: '用户状态',
    dataIndex: 'state',
    sorter: false,
    scopedSlots: {customRender: 'state'}
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    sorter: false,
    scopedSlots: {customRender: 'userType'}
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
  name: 'studentManage',
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
      dataIdName: 'userId',
      fetchUrl: 'api/getallstudent',
      delUrl: 'api/delUserById',
      saveUrl: 'api/updateuser'
    }
  }
}
</script>

<style scoped>

</style>
