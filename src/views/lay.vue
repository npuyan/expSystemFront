<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        weight: '50vw',
        position: 'fixed',
        left: 0,}">
      <div class="logo">
        <a-input-search
          aria-placeholder="搜索"
          @click="search"
        ></a-input-search>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']">
        <!--        @click="getlab(courseitem.courseId, courseitem.courseName)">-->
        <a-menu-item :key="courseitem.courseId" v-for="courseitem in courselist" @click="getlab(courseitem.courseId, courseitem.courseName)">
          {{ courseitem.courseName }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style=" { marginLeft:
        '200px' }">
        <a-layout-header style="background: #fff; padding: 0; text-align: center">
          <h1 style="font-size: 25px">实验系统</h1>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>计算机科学</a-breadcrumb-item>
            <a-breadcrumb-item>{{ course_name }}</a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            <a-row :gutter="16">
              <div v-for="labitem in lablist">
                <a-col span="6">
                  <a-card title="ubuntu" style="width: 200px">
                    <a @click="onJump('6080')">
                      <div style="text-align: center">
                        <img
                          src="../assets/logo.png"
                          style="width: 100px; height: 100px"
                        />
                        <h3>{{ labitem.labName }}</h3>
                      </div>
                    </a>
                  </a-card>
                </a-col>
              </div>
            </a-row>
            <br/>
            <!-- </div> -->
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design @ZTY
        </a-layout-footer>
  </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    // todos

    return {
      collapsed: true,
      courselist: [],
      course_name: null,
      lablist: []
    }
  },

  mounted () {
    console.log('mounted!')

    var _this = this
    _this.postRequest('api/getselectedcourses', {
      username: String(this.$route.query.user_name)
    }).then(resp => {
      if (resp) {
        console.log('得到课程数据')
        console.log(resp)
        _this.courselist = resp
      } else {
        alert('连接服务器失败')
      }
    })
  },

  methods: {
    onJump: function (a) {
      console.log('submit!')
      // eslint-disable-next-line no-unused-vars
      console.log(this.$router)

      this.$router.push({path: '/novnc', query: {port: a}})
      // window.location.assign("http://ubuntu:"+ans)
    },
    onJumpNewPort: function (a) {
      console.log('new Port')
      console.log(a)
      var _this = this
      alert('正在创建新的容器，请确定后等待5s')
      _this
        .postRequest('api/startNewPort', {
          port: String(a)
        })
        .then((resp) => {
          if (resp) {
            alert('连接成功')
            this.$router.push({path: '/novnc', query: {port: a}})
          } else {
            alert('连接服务器失败')
          }
        })
    },

    search: function () {
    },

    getlab: function (id, name) {
      console.log('getlab', id, name)
      this.course_name = name
      console.log('to string', String(id))
      var _this = this
      _this.postRequest('api/getlabbycourseid', {
        courseid: String(id)
      }).then(resp => {
        if (resp) {
          console.log('得到课程实验数据')
          console.log(resp)
          _this.lablist = resp
        } else {
          alert('连接服务器失败')
        }
      })
    }
  }
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
