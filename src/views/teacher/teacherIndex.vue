<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">
        <img
          src="../../assets/logoko.png"
          @click="backDefaultPage"
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
        <h1 style="font-size: 25px">{{ menuitem }}</h1>
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
        Ant Design ©2018 Created by Ant UED
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
  height: 90px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
