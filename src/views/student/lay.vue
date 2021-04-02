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
        <br />
        <br />
        <a-button type="primary" size="large" @click="selectcourse()">
          进入选课
        </a-button>
        <br />
        <br />
      </div>
      <!--搜索栏-->
      <div class="logo">
        <a-input-search
          aria-placeholder="搜索"
          @click="search"
        ></a-input-search>
      </div>
      <!-- 左侧课程名称-->
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="[courselist[0].courseId]"
        @select="gotolab"
      >
        <a-menu-item v-for="item in courselist" :key="item.courseId">
          <!--                     @click="getlab(key, courseitem.courseName)"-->
          <span> {{ item.courseName }}</span>
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

        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>

        <!-- <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <a-list :grid="{ gutter: 16, column: 4 }" :data-source="lablist">
            <a-list-item
              slot="renderItem"
              slot-scope="item, index"
              @click="onJumpLab(item)">
              <a-card>
                <img :src="imageUrl" style="width: 100px; height: 100px"/>
                <a-list-item-meta description="容器镜像">
                  <a slot="title">{{ item.labName }}</a>
                </a-list-item-meta>
              </a-card>
            </a-list-item>
            <br/>
          </a-list>
        </div> -->
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design @ZTY
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    // todos

    return {
      collapsed: true,
      courselist: [],
      course_name: null,
      lablist: [],
      imageBaseUrl: "api/downloadcoursepicture?filename=",
      imageUrl: '',
    };
  },

  mounted() {
    console.log("mounted!");

    var _this = this;
    _this
      .postRequest("api/getselectedcourses", {
        username: this.$store.state.userName,
      })
      .then((resp) => {
        if (resp) {
          console.log("得到课程数据");
          console.log(resp);
          this.courselist = resp;
          // this.course_name = this.courselist[0].courseName
          this.gotolab({item: 0, key: this.courselist[0].courseId, selectedKeys: 0})
        } else {
          alert("连接服务器失败");
        }
      });
  },

  methods: {
    search: function () {},
    gotolab: function ({ item, key, selectedKeys }) {
      console.log("key" + key);
      var i = 0;

      for (i = 0; i < this.courselist.length; i++) {
        if (this.courselist[i].courseId === key) {
          this.imageUrl = this.imageBaseUrl + this.courselist[i].picture;
        }
      }

      var course = this.courselist.filter((it) => key === it.courseId)[0];
      var id = course.courseId;
      var name = course.courseName;
      console.log("gotolab", id, name,this.imageUrl);
      this.$router.push({
        path: "/studentCourseDetails",
        query: {
          studentName: this.$store.state.userName,
          studentId: this.$store.state.userId,
          courseId: id,
          imageUrl: this.imageUrl,
        },
      });
    },

    selectcourse: function () {
      console.log("step in select course page!");
      // eslint-disable-next-line no-unused-vars
      console.log(this.$router);

      this.$router.push({
        path: "/course",
      });
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
