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
<!--  <div>-->
<!--    <a-button class="editable-add-btn" @click="handleAdd">-->
<!--      添加-->
<!--    </a-button>-->
<!--    <a-table-->
<!--      bordered-->
<!--      :columns="columns"-->
<!--      :data-source="data"-->
<!--      :loading="loading"-->
<!--      @change="handleTableChange">-->
<!--&lt;!&ndash;      <a-input>你好</a-input>&ndash;&gt;-->
<!--      <template v-for="col in columnsName"-->
<!--                :slot="col"-->
<!--                slot-scope="text,record,index">-->
<!--        <div :key="col">-->
<!--          <a-input v-if="record.editable"-->
<!--                   style="margin: -5px 0"-->
<!--                   :value="text"-->
<!--                   @change="e=>handleChange(e.target.value, record.key, col)"/>-->
<!--          <template v-else>-->
<!--            {{ text }}-->
<!--          </template>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template slot="delete" slot-scope="text, record,index">-->
<!--        <a-popconfirm v-if="data.length"-->
<!--                      title="确定删除吗？"-->
<!--                      @confirm="() => onDelete(record.key)"-->
<!--        >-->
<!--          <a-button>删除</a-button>-->
<!--          &lt;!&ndash;          <a href="javascript:;">删除</a>&ndash;&gt;-->
<!--        </a-popconfirm>-->
<!--      </template>-->
<!--      <template slot="edit" slot-scope="text,record,index">-->
<!--        <div class="editable-row-operations">-->
<!--          <span v-if="record.editable">-->
<!--            <a @click="()=>save(record.key)">-->
<!--              保存-->
<!--            </a>-->
<!--            <a-popconfirm title="确定取消吗?"-->
<!--                          @confirm="()=>cancel(record.key)">-->
<!--              <a>取消</a>-->
<!--            </a-popconfirm>-->
<!--          </span>-->
<!--          <span v-else>-->
<!--            <a-button :disabled="editingKey!==''" @click="()=>edit(record.key)">-->
<!--              编辑-->
<!--            </a-button>-->
<!--          </span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </a-table>-->
<!--  </div>-->
</template>

<script>
import UtilTable from './utilTable'
const columnsName = [
  'userId', 'courseId'
]
const columns = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   sorter: true,
  //   width: '20%'
  // },
  {
    title: '用户id',
    dataIndex: 'userId',
    sorter: false,
    width: '20%',
    scopedSlots: {customRender: 'userId'}
  },
  {
    title: '课程id',
    dataIndex: 'courseId',
    sorter: false,
    scopedSlots: {customRender: 'courseId'}
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
  name: 'chooseCourseManage',
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
      fetchUrl: 'api/getallusercourse',
      delUrl: 'api/dropcoursebyid',
      saveUrl: 'api/updateusercourse'
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
  //     _this.getRequest('api/getallusercourse', {
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
  //     item.key = item.id
  //     delete item.id
  //   },
  //   renameBackId: function (item) {
  //     item.id = item.key
  //     delete item.id
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
