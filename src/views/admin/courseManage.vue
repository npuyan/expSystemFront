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
  'courseName', 'author', 'type', 'tag', 'time', 'picture', 'createTime', 'remark'
]
const columns = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   sorter: true,
  //   width: '20%'
  // },
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
  }, {
    title: '编辑',
    dataIndex: 'edit',
    scopedSlots: {customRender: 'edit'}
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
      /* 完成1,2,3 */
      fetchUrl: 'api/getallcourse',
      delUrl: 'api/delcoursebyid',
      saveUrl: 'api/updatecourse'
    }
  }
  // mounted () {
  //   this.fetch()
  // },
  // methods: {
  //   handleTableChange (pagination, filters, sorter) {
  //     // console.log(pagination)
  //     const pager = {...this.pagination}
  //     pager.current = pagination.current
  //     this.pagination = pager
  //     this.fetch({
  //       results: pagination.pageSize,
  //       page: pagination.current,
  //       sortField: sorter.field,
  //       sortOrder: sorter.order,
  //       ...filters
  //     })
  //   },
  //   handleChange (value, key, column) {
  //     const newData = [...this.data]
  //     const target = newData.filter(item => key === item.key)[0]
  //     if (target) {
  //       target[column] = value
  //       this.data = newData
  //     }
  //   },
  //   fetch (params = {}) {
  //     var _this = this
  //     // console.log('params:', params)
  //     this.loading = true
  //     _this.getRequest('api/getallcourse', {
  //       results: 10,
  //       ...params
  //     }).then(data => {
  //       const pagination = {...this.pagination}
  //       // Read total count from server
  //       // pagination.total = data.totalCount;
  //       pagination.total = 200
  //       _this.loading = false
  //       _this.data = data
  //       _this.pagination = pagination
  //       _this.count = data.length
  //       data.forEach(this.renameId)
  //       // console.log(data)
  //       this.cacheData = data.map(item => ({...item}))
  //     })
  //   },
  //   renameId: function (item) {
  //     item.key = item.courseId
  //     delete item.courseId
  //   },
  //   renameBackId: function (item) {
  //     item.courseId = item.key
  //     delete item.courseId
  //   },
  //   handleAdd () {
  //     const {count, data} = this
  //     const newData = {
  //       id: '自动生成',
  //       userId: '--',
  //       courseId: '--'
  //     }
  //     this.data = [...data, newData]
  //     this.count = count + 1
  //   },
  //   onDelete (key) {
  //     var _this = this
  //     this.loading = true
  //     // alert(key)
  //     console.log()
  //     _this.postRequest('api/dropcoursebyid', {
  //       id: key
  //     }).then(resp => {
  //       const data = [...this.data]
  //       this.data = data.filter(item => item.key !== key)
  //       _this.count = data.length
  //       _this.loading = false
  //     })
  //   },
  //   edit (key) {
  //     const newData = [...this.data]
  //     const target = newData.filter(item => key === item.key)[0]
  //     this.editingKey = key
  //     if (target) {
  //       // alert(key)
  //       target.editable = true
  //       // alert(target.editable)
  //       this.data = newData
  //     }
  //   },
  //   save (key) {
  //     const newData = [...this.data]
  //     const newCacheData = [...this.cacheData]
  //     const target = newData.filter(item => key === item.key)[0]
  //     console.log(target)
  //     const targetCache = newCacheData.filter(item => key === item.key)[0]
  //     if (target && targetCache) {
  //       const newtarget = target
  //       newtarget.id = newtarget.key
  //       delete newtarget.key
  //       delete newtarget.editable
  //       // TODO 在不影响过去传参的条件下，更改传参方式直接传对象，在后端进行对象的分析，节省前端的传参量
  //       this.postRequest('api/updateusercourse', {
  //         id: newtarget.id, userId: newtarget.userId, courseId: newtarget.courseId
  //       }).then(resp => {
  //
  //       })
  //       delete target.editable
  //       this.data = newData
  //       Object.assign(targetCache, target)
  //       this.cacheData = newCacheData
  //     }
  //     this.editingKey = ''
  //   },
  //   cancel (key) {
  //     const newData = [...this.data]
  //     const target = newData.filter(item => key === item.key)[0]
  //     this.editingKey = ''
  //     if (target) {
  //       Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
  //       delete target.editable
  //       this.data = newData
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>
