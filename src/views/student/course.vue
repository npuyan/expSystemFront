<template>
  <div>
    <div id="target"></div>
    <div style="background-color: #f5f5f5; padding: 15px">
      <!-- style="border: 2px solid rgb(50, 50, 24)" -->
      <a-page-header
        :ghost="true"
        title="所有课程"
        sub-title="All courses"
        @back="backHistory"
      />
    </div>

    <a-list
      :grid="{ gutter: 1, column: 4 }"
      :data-source="courselist"
      size="default"
      :bordered="true"
      position
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <img src="../../assets/logo.png" style="width: 100px; height: 100px" />
        <a-list-item-meta description="">
          <a slot="title">{{ item.courseName }}</a>

          <!-- <a-avatar slot="avatar" src="../assets/logo.png" /> -->
        </a-list-item-meta>
        <a-button type="primary" @click="selectthis(item.courseId)"
          >选课</a-button
        >
        <a-button type="primary" @click="dropthis(item.courseId)"
          >退课</a-button
        >
      </a-list-item>
    </a-list>

    <a-icon type="up-circle" style="fontsize: 50px" @click="backtop()" />
    <p>返回顶部</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      courselist: []
    }
  },

  mounted () {
    console.log('mounted!')

    var _this = this
    _this.postRequest('api/getallcourse', {}).then((resp) => {
      if (resp) {
        console.log('得到课程数据')
        console.log(resp)
        _this.courselist = resp
      } else {
        console.log(resp)
        alert('连接服务器失败')
      }
    })
  },

  methods: {
    selectthis: function (id) {
      console.log('selectthis!')
      console.log(id)
      console.log(this.$route.query.user_name)
      var _this = this
      _this
        .postRequest('api/choosecourse', {
          username: String(this.$route.query.user_name),
          courseid: String(id)
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log('请求成功，等待老师审批')
            console.log(resp)
            alert('请求成功，等待老师审批')
          } else {
            if (resp.status === 500) {
              alert(resp.msg)
            } else {
              alert(resp.msg)
            }
            console.log(resp)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    dropthis: function (id) {
      console.log('drop this course!')
      console.log(id)
      console.log(this.$route.query.user_name)
      var _this = this
      _this
        .postRequest('api/dropcourse', {
          username: String(this.$route.query.user_name),
          courseid: String(id)
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log('退课成功')
            console.log(resp)
            alert('退课成功')
          } else {
            if (resp.status === 500) {
              alert(resp.msg)
            } else {
              alert(resp.msg)
            }
            console.log(resp)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    backHistory () {
      this.$router.go(-1) // 返回上一层
    },

    backtop () {
      target.scrollIntoView()
    }
  }
}
</script>
<style>
</style>
