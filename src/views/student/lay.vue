<template>
  <a-layout id="components-layout-demo-top-side-2" style="min-height: 100vh">
    <a-layout-header class="header">
      <div class="topHeader">
        <a-row type="flex">
          <!-- <a-input-search
              aria-placeholder="搜索"
              @click="search"
            ></a-input-search> -->
          <a-col :span="3" :order="1">
          <div class="logoleft">
            <img
              src="../../assets/logoko.png"
              @click="backDefaultPage"
              width="60%"
            />
          </div>
          </a-col>

          <a-col :span="6" :order="3">
          <a-menu
            theme="light"
            mode="horizontal"
            :default-selected-keys="['1']"
            :style="{ lineHeight: '64px' }"
            @select="switchpage"
          >
            <a-menu-item key="1"> 学习天地 </a-menu-item>
            <a-menu-item key="2"> 选课系统 </a-menu-item>
          </a-menu>
          </a-col>
          <a-col :span="6" :order="2">
          </a-col>
          <a-col :span="6" :order="4">
          </a-col>
          
          <a-col :span="2" :order="5">
          <div class="rightmenu">
            <a-button @click="backDefaultPage">退出</a-button>
          </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="currentPage === '1'"
        width="200"
        style="background: #fff"
      >
        <!-- 左侧课程名称-->
        <a-menu
          mode="inline"
          theme="dark"
          :default-selected-keys="['1']"
          :style="{ height: '100%', borderRight: 0 }"
          @select="gotolab"
        >
          <a-menu-item v-for="item in courselist" :key="item.courseId">
            <!--                     @click="getlab(key, courseitem.courseName)"-->
            <span> {{ item.courseName }}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
// import func from 'vue-editor-bridge';
export default {
  data() {
    // todos

    return {
      collapsed: true,
      courselist: [],
      course_name: null,
      lablist: [],
      imageBaseUrl: "api/downloadcoursepicture?filename=",
      imageUrl: "",
      currentCourseKey: null,
      currentPage: "1",
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
          this.course_name = this.courselist[0].courseName;
          this.gotolab({
            item: 0,
            key: this.courselist[0].courseId,
            selectedKeys: 0,
          });
        } else {
          alert("连接服务器失败");
        }
      });
  },

  methods: {
    switchpage: function (menuitem) {
      this.currentPage = menuitem.key;
      console.log("key = ", menuitem);
      if (menuitem.key == "1") {
        this.gotolab({
          item: 0,
          key: this.courselist[this.currentCourseKey].courseId,
          selectedKeys: 0,
        });
      } else if (menuitem.key == "2") {
        this.selectcourse();
      }
    },
    search: function () {},
    gotolab: function ({ item, key, selectedKeys }) {
      console.log("key" + key);

      var i = 0;

      for (i = 0; i < this.courselist.length; i++) {
        if (this.courselist[i].courseId === key) {
          this.imageUrl = this.imageBaseUrl + this.courselist[i].picture;
          this.course_name = this.courselist[i].courseName;
          this.currentCourseKey = i;
        }
      }

      var course = this.courselist.filter((it) => key === it.courseId)[0];
      var id = course.courseId;
      var name = course.courseName;
      console.log("gotolab", id, name, this.imageUrl);
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

    backDefaultPage: function () {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
.topHeader {
  width: 100%;
}
.logoleft {
  width: 80%;
  display: block;
  float: left;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.rightmenu {
  width: 20%;
  text-align: right;
  display: block;
  float: left;
}
</style>
