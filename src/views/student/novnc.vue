<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        width="35vw"
        :style="{ overflow: 'auto', height: '100vh', background: '#fff' }"
        v-model="collapsed"
        collapsible
      >
      <a-breadcrumb style="margin: 16px 0">
              <a-breadcrumb-item><a @click="backIndexPage">学生</a></a-breadcrumb-item>
              <a-breadcrumb-item ><a @click="backIndexPage">{{ labitem.courseName }}</a></a-breadcrumb-item>
              <a-breadcrumb-item><a>{{ labitem.labName }}</a></a-breadcrumb-item>
            </a-breadcrumb>
        <div v-if="!collapsed">

          <div id="buttongroup" style="margin: 2vh">
            <!-- <a-button-group :size="large"> -->
            
            <!-- <a-button @click="backIndexPage">返回上一级</a-button> -->
            <a-button v-if="prevIndex != null" type="primary" @click="prev()">
              <a-icon type="left" />
              上一节
            </a-button>
            <a-dropdown-button>
              {{ labitem.labName }}
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item v-for="item in lablist" :key="item">
                  <a-icon type="desktop" /> {{ item.labName }}</a-menu-item
                >
              </a-menu>
            </a-dropdown-button>

            <!-- <a-button type="dash"> {{ labitem.labName }}</a-button> -->
            <a-button v-if="nextIndex != null" type="primary" @click="next()">
              下一节
              <a-icon type="right" />
            </a-button>
            <!-- </a-button-group> -->
          </div>
          <iframe
            :src="'/static/pdf/web/viewer.html?file=' + fileUrl"
            height="820"
            width="100%"
          >
          </iframe>
        </div>
        <br /><br /><br />
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="margin: 0 16px">
          <div
            :id="this.$route.params.port"
            :style="{ padding: '2vh', background: '#fff', height: '100vh' }"
          >
            <iframe id="novncframe" class="novnc" :src="fullUrl"> </iframe>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©ZTY
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      port: this.$route.query.port,
      // url: "http://124.70.84.98:",
      url: "http://202.117.249.18:",
      numPages: null, // pdf 总页数
      lablist: [],
      prevIndex: null,
      nextIndex: null,
      labitem: this.$route.query.labObj,
      baseFileUrl: this.$store.state.baseUrl + "/api/downloadfile?filename=",
      fileUrl: "",
      pageCount: 1,
    };
  },
  computed: {
    fullUrl: function () {
      return this.url + "" + this.port;
    },
  },
  methods: {
    prev() {
      this.unloadHandler();
      this.onJumpLab(this.lablist[this.prevIndex]);
    },
    next() {
      this.unloadHandler();
      this.onJumpLab(this.lablist[this.nextIndex]);
    },

    onJumpLab: function (labitem) {
      this.pageCount ++;
      console.log("labitem");
      console.log(labitem);
      // this.$router.push({path: '/novnc', query: {port: 6080, labObj: labitem}})
      this.postRequest("api/openlabenv", {
        //  TODO 传入课程，实验，用户名，打开对应的实验环境并返回启动的的端口
        username: String(this.$store.state.userName),
        courselab: labitem,
      }).then((resp) => {
        //  TODO 跳转到novnc并连接到返回的端口
        if (resp && resp.status === 200) {
          console.log(resp);
          this.port = resp.obj;
        }

        this.labitem = labitem;
        this.fileUrl = encodeURIComponent(
          this.baseFileUrl + this.labitem.docPath
        );
        this.setPrevNext();
      });
    },

    handleMenuClick: function ({ item, key, selectedKeys }) {
      console.log("handleclick: ", key);
      this.unloadHandler();
      this.onJumpLab(key);
    },

    test: function () {
      alert(this.port);
    },
    beforeunloadHandler(e) {
      // debugger
      this._beforeUnload_time = new Date().getTime();
      console.log("this._beforeUnload_time：", this._beforeUnload_time);
      e = e || window.event;
      if (e) {
        e.returnValue = "关闭提示";
      }
      // debugger
      return "关闭提示";
    },
    unloadHandler() {
      console.log("this._beforeUnload_time2：", this._beforeUnload_time);
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      console.log("this._gap_time：", this._gap_time);
      // 判断是窗口关闭还是刷新
      // 关闭前暂停容器进程
      this.postRequest("api/pauselabenv", {
        username: this.$store.state.userName,
        courselab: this.labitem,
      }).then((resp) => {
        if (resp) {
          console.log(resp.msg);
        }
      });
    },

    setPrevNext() {
      var i;
      this.prevIndex = null;
      this.nextIndex = null;
      for (i = 0; i < this.lablist.length; i++) {
        console.log("this.lablist[i].labId  =", this.lablist[i].labId);
        if (this.lablist[i].labId === this.labitem.labId) {
          if (i > 0) {
            this.prevIndex = i - 1;
          }
          break;
        }
      }

      for (i = 0; i < this.lablist.length; i++) {
        console.log("this.lablist[i].labId  =", this.lablist[i].labId);
        if (this.lablist[i].labId === this.labitem.labId) {
          if (i === this.lablist.length - 1) {
          } else {
            this.nextIndex = i + 1;
          }
          break;
        }
      }
      console.log("previndex =", this.prevIndex);
      console.log("nextindex =", this.nextIndex);
    },
    backIndexPage() {
      this.unloadHandler();
      var i;
      for(i=0;i<this.pageCount;i++){
        this.$router.back();
      }
    },
  },
  mounted() {
    this.fileUrl = encodeURIComponent(this.baseFileUrl + this.labitem.docPath);
    let _this = this;
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    window.addEventListener("unload", (e) => this.unloadHandler(e));

    _this
      .postRequest("api/getlabbycourseid", {
        courseid: String(this.labitem.courseId),
      })
      .then((resp) => {
        if (resp) {
          console.log("得到课程实验数据");
          console.log(resp);
          _this.lablist = resp;
          this.setPrevNext();
        } else {
          alert("连接服务器失败");
        }
      });
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", (e) => this.unloadHandler(e));
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  margin: 16px;
}

.novnc {
  height: 100%;
  width: 100%;
  float: left;
}

p {
  margin-bottom: 15px;
}
</style>
