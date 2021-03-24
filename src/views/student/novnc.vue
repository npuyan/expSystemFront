<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      width="35vw"
      :style="{ overflow: 'auto', height: '100vh', background: '#fff' }"
      v-model="collapsed"
      collapsible
    >
      <div v-if="!collapsed">
        <div id="buttongroup" style="margin: 2vh">
          <a-button-group :size="large">
            <a-button type="primary" @click="">
              <a-icon type="left" />
              上一节
            </a-button>
            <a-button type="dash"> 章节一：熟悉系统 </a-button>
            <a-button type="primary">
              下一节
              <a-icon type="right" />
            </a-button>
          </a-button-group>
        </div>
        <iframe :src="'/static/pdf/web/viewer.html?file=' + fileUrl" height="820" width="100%">
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
</template>
<script>

export default {

  data() {
    return {
      collapsed: false,
      port: this.$route.query.port,
      url: "http://124.70.84.98:",
      numPages: null, // pdf 总页数 
      fileUrl: encodeURIComponent('http://localhost:8081/api/downloadfile?filename=' + this.$route.query.labObj.docPath)
    };
  },
  computed: {
    fullUrl: function () {
      return this.url + "" + this.port;
    },
  },
  methods: {
    test: function () {
      alert(this.port);
    },
    beforeunloadHandler (e) {
      // debugger
      this._beforeUnload_time = new Date().getTime()
      console.log('this._beforeUnload_time：', this._beforeUnload_time)
      e = e || window.event
      if (e) {
        e.returnValue = '关闭提示'
      }
      // debugger
      return '关闭提示'
    },
    unloadHandler () {
      console.log('this._beforeUnload_time2：', this._beforeUnload_time)
      this._gap_time = new Date().getTime() - this._beforeUnload_time
      console.log('this._gap_time：', this._gap_time)
      // 判断是窗口关闭还是刷新
        // 关闭前暂停容器进程
      this.postRequest("api/pauselabenv", {
        username: this.$store.state.userName,
        courselab: this.$route.query.labObj
      }).then((resp)=>{
        if(resp){
          console.log(resp.msg)
        }
      })
     }
  },
  mounted() {
    let _this = this;
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
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
