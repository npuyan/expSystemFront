<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        width="35vw"
        :style="{ overflow: 'auto', height: '100vh', background: '#fff'}"
        v-model="collapsed"
        collapsible
        theme="light"
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
  mounted(){
    if( this.$store.state.userName != ''){
      console.log("userName != undefined")
      window.sessionStorage
      sessionStorage.setItem('userName', this.$store.state.userName)
      sessionStorage.setItem('userId', this.$store.state.userId)
      sessionStorage.setItem('userType', this.$store.state.userType)
      console.log("userName = ", sessionStorage.getItem("userName"))
      sessionStorage.setItem('courseId', this.labitem.courseId)
      sessionStorage.setItem('port', this.port)
      sessionStorage.setItem('pageCount', this.pageCount)
    }
    else{
      console.log("userName == undefined")
      console.log("userName = ", sessionStorage.getItem("userName"))
      this.$store.commit('update', ['userName', sessionStorage.getItem("userName")])
      this.$store.commit('update', ['userId', sessionStorage.getItem("userId")])
      this.$store.commit('update', ['userType', sessionStorage.getItem("userType")])
      this.labitem = Object
      this.labitem['courseId'] = sessionStorage.getItem("courseId")
      this.port = sessionStorage.getItem("port")
      this.currentIndex = sessionStorage.getItem("currentIndex")
      this.pageCount = sessionStorage.getItem("pageCount")
      console.log("port = ", sessionStorage.getItem("port"))
    }


    

    
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
          if(this.currentIndex != null){
            _this.labitem = resp[this.currentIndex]
          }
          console.log(_this.labitem)
          this.fileUrl = encodeURIComponent(this.baseFileUrl + _this.labitem.docPath);
          this.setPrevNext();
        } else {
          alert("连接服务器失败");
        }
      });


  },  
  data() {
    return {
      collapsed: false,
      port: this.$route.query.port,
      // url: "http://124.70.84.98:",
      url: "http://202.117.249.18:",
      // url: "http://10.168.4.167:",
      numPages: null, // pdf 总页数
      lablist: [],
      prevIndex: null,
      currentIndex: null,
      nextIndex: null,
      labitem: this.$route.query.labObj,
      baseFileUrl: this.$store.state.baseUrl + "/api/downloadfile?filename=",
      fileUrl: "",
      pageCount: 2,
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
      this.pageCount += 2;
      console.log("labitem");
      console.log(labitem);
      console.log("pageCount = ",this.pageCount);
      this.postRequest("api/openlabenv", {
        //  TODO 传入课程，实验，用户名，打开对应的实验环境并返回启动的的端口
        username: String(this.$store.state.userName),
        courselab: labitem,
      }).then((resp) => {
        //  TODO 跳转到novnc并连接到返回的端口
        if (resp && resp.status === 200) {
          console.log(resp);
          this.port = resp.obj;
          sessionStorage.setItem('port', this.port)
        }

        this.labitem = labitem;
        this.fileUrl = encodeURIComponent(
          this.baseFileUrl + this.labitem.docPath
        );
        this.setPrevNext();
        sessionStorage.setItem('courseId', this.labitem.courseId)
        
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
          this.currentIndex = i
          sessionStorage.setItem('currentIndex', this.currentIndex)
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
        console.log("back i = ", i)
        this.$router.back();
      }
    },
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
