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
        :default-selected-keys="['/clusterManage']"
        @select="meunitemselect"
        @click="menuClick">
        <a-menu-item v-for="item in menuList" v-if="item.title" :key="item.path" :title="item.title">
          <span>{{ item.title }}</span>
        </a-menu-item>
        <!--        <a-menu-item v-else-if="!item.title" :key="index+1" :title="item">-->
        <!--          <span>{{ item }}</span>-->
        <!--        </a-menu-item>-->
      </a-menu>
    </a-layout-sider>
    <a-layout :style=" { marginLeft:
        '200px' }">
      <a-layout-header style="background: #fff; padding: 0; text-align: center">
        <h1 style="font-size: 25px">{{ menuitem }}</h1>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>管理员</a-breadcrumb-item>
          <a-breadcrumb-item>{{ menuitem }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view/>
          <!-- </div> -->
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design @ZTY
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script src="//www.itxst.com/package/ant-design-vue/vue-dash-event.js"></script>
<script>
export default {
  name: 'adminIndex',
  data() {
    return {
      pageform: '',
      menuitem: '集群管理',
      menuList: [
        {
          //在index.js中设置打开管理员界面默认重定向到集群管理
          title: '集群管理',
          path: '/clusterManage'
        },
        {
          title: '课程管理',
          path: '/courseManage'
        },
        {
          title: '环境管理',
          path: '/envManage'
        }
        ,
        {
          title: '镜像管理',
          path: '/imageManage'
        }
        ,
        {
          title: '实验管理',
          path: '/labManage'
        }
        ,
        {
          title: '教师管理',
          path: '/teacherManage'
        }
        ,
        {
          title: '学生管理',
          path: '/studentManage'
        }
        ,
        {
          title: '选课管理',
          path: '/chooseCourseManage'
        }
      ]
    }
  },
  mounted(){
    if( this.$store.state.userName != ''){
      console.log("userName != undefined")
    }
    else{
      console.log("userName == undefined")
      console.log("userName = ", sessionStorage.getItem("userName"))
      this.$store.commit('update', ['userName', sessionStorage.getItem("userName")])
      this.$store.commit('update', ['userId', sessionStorage.getItem("userId")])
      this.$store.commit('update', ['userType', sessionStorage.getItem("userType")])
    }
    window.sessionStorage
    sessionStorage.setItem('userName', this.$store.state.userName)
    sessionStorage.setItem('userId', this.$store.state.userId)
    sessionStorage.setItem('userType', this.$store.state.userType)
    console.log("userName = ", sessionStorage.getItem("userName"))
  },
  methods: {
    search: function () {
    },
    meunitemselect({item, key, selectedKeys}) {
      this.menuitem = item.title
      this.$router.push({
          path: key})
    },
    menuClick({item, key, keyPath}) {
      // 获取到当前的key,并且跳转
      // this.$router.push({
      //   path: key
      // })
    },
  },
  computed: {}
}
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
