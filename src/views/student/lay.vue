<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        weight: '50vw',
        position: 'fixed',
        left: 0,
      }"
    >
      <!--  选课按钮    -->
      <div>
        <br/>
        <br/>
        <a-button type="primary" size="large" @click="selectcourse()">
          进入选课
        </a-button>
        <br/>
        <br/>
      </div>
      <!--搜索栏-->
      <div class="logo">
        <a-input-search
          aria-placeholder="搜索"
          @click="search"
        ></a-input-search>
      </div>
      <!-- 左侧课程名称-->
      <a-menu theme="dark"
              mode="inline"
              :default-selected-keys="[courselist[0].courseId]"
              @select="getlab">
        <a-menu-item v-for="item in courselist" :key="item.courseId">
          <!--                     @click="getlab(key, courseitem.courseName)"-->
          <span>  {{ item.courseName }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout :style="{ marginLeft: '200px' }">
      <!--     右侧叶面题头 -->
      <a-layout-header style="background: #fff; padding: 0; text-align: center">
        <h1 style="font-size: 25px">实验系统</h1>
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">

        <!--    右侧crumb    -->
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>学生</a-breadcrumb-item>
          <a-breadcrumb-item>{{ course_name }}</a-breadcrumb-item>
        </a-breadcrumb>

        <!--右侧实验列表        -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <a-list :grid="{ gutter: 16, column: 4 }" :data-source="lablist">
            <a-list-item
              slot="renderItem"
              slot-scope="item, index"
              @click="onJumpLab(item)">
              <!--          容器显示卡片    -->
              <a-card>
                <img src="../../assets/logo.png" style="width: 100px; height: 100px"/>
                <a-list-item-meta description="容器镜像">
                  <a slot="title">{{ item.labName }}</a>
                </a-list-item-meta>
              </a-card>
            </a-list-item>
            <br/>
          </a-list>
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
    }).then((resp) => {
      if (resp) {
        console.log('得到课程数据')
        console.log(resp)
        this.courselist = resp
        this.course_name = this.courselist[0].courseName
        this.getlab({item: 0, key: this.courselist[0].courseId, selectedKeys: 0})
      } else {
        alert('连接服务器失败')
      }
    })
  },

  methods: {
    // onJump: function (a) {
    //   console.log('submit!')
    //   console.log(this.$router)
    //   this.$router.push({path: '/novnc', query: {port: a}})
    // },
    onJumpLab: function (labitem) {
      console.log('labitme')
      console.log(labitem)
      this.postRequest('api/openlabenv', {
        //  TODO 传入课程，实验，用户名，打开对应的实验环境并返回启动的的端口
        username: String(this.$route.query.user_name),
        courselab: labitem
      }).then((resp) => {
        //  TODO 跳转到novnc并连接到返回的端口
        if (resp && resp.status === 200) {
          console.log(resp)
          this.$router.push({path: '/novnc', query: {port: resp.obj}})
        }
      })
    },
    // onJumpNewPort: function (a) {
    //   console.log('new Port')
    //   console.log(a)
    //   var _this = this
    //   alert('正在创建新的容器，请确定后等待5s')
    //   _this
    //     .postRequest('api/startNewPort', {
    //       port: String(a)
    //     })
    //     .then((resp) => {
    //       if (resp) {
    //         alert('连接成功')
    //         this.$router.push({path: '/novnc', query: {port: a}})
    //       } else {
    //         alert('连接服务器失败')
    //       }
    //     })
    // },
    search: function () {
    },
    getlab: function ({item, key, selectedKeys}) {
      console.log('key' + key)
      var course = this.courselist.filter(it => key === it.courseId)[0]
      var id = course.courseId
      var name = course.courseName
      console.log('getlab', id, name)
      this.course_name = name
      var _this = this
      _this
        .postRequest('api/getlabbycourseid', {
          courseid: String(id)
        })
        .then((resp) => {
          if (resp) {
            console.log('得到课程实验数据')
            console.log(resp)
            _this.lablist = resp
          } else {
            alert('连接服务器失败')
          }
        })
    },

    selectcourse: function () {
      console.log('step in select course page!')
      // eslint-disable-next-line no-unused-vars
      console.log(this.$router)

      this.$router.push({
        path: '/course',
        query: {user_name: this.$route.query.user_name}
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
