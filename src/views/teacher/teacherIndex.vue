<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">
        <img
          src="../../assets/logoko.png"
          width="100%"
        />

        <!-- <a-input-search
          aria-placeholder="搜索"
          @click="search"
        ></a-input-search> -->
      </div>
      <a-menu
        theme="dark"
        :default-selected-keys="['/mycourse']"
        mode="inline"
        @click="meunitemselect"
      >
        <a-menu-item
          v-for="item in menuList"
          v-if="item.title"
          :key="item.path"
          :title="item.title"
        >
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row type="flex">
          <a-col :span="23" :order="1">
        <h1 style="font-size: 25px">{{ menuitem }}</h1>
          </a-col>
          <a-col :span="1" :order="2">
        <a-button @click="backDefaultPage">退出</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>教师</a-breadcrumb-item>
          <a-breadcrumb-item>{{ menuitem }}</a-breadcrumb-item>
        </a-breadcrumb>

        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <!-- <div v-if="useCache === true">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive" />
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div> -->
          <router-view v-if="useCache === false"/>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  data() {
    return {
      collapsed: false,
      menuitem: "我的课程",
      menuList: [
        {
          // 在index.js中设置打开教师页面默认重定向到我的课程
          title: "我的课程",
          path: "/mycourse",
        },
        {
          title: "我的学生",
          path: "/mystudent",
        },
        {
          title: "我的实验",
          path: "/myLab",
        },
        {
          title: "成绩管理",
          path: "/courseGrade",
        },
        {
          title: "待处理申请",
          path: "/pendingApplications",
        },
      ],
      useCache: false
    };
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
    search: function () {},
    meunitemselect({ item, key, selectedKeys }) {
      this.menuitem = item.title;
      this.$router.push({
        path: key,
      });
    },
    backDefaultPage: function () {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
