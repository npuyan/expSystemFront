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
        <div class="markdown-body">
          <lab-markdown></lab-markdown>
        </div>
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
import labMarkdown from "../../assets/实验.md";
import "highlight.js/styles/github.css";
import "github-markdown-css";

export default {
  components: {
    labMarkdown,
  },

  data() {
    return {
      collapsed: false,
      port: this.$route.query.port,
      url: "http://49.234.13.89:",
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
  },
  mounted() {
    let _this = this;
    window.onbeforeunload = function (e) {
      if (_this.$route.name == "novnc") {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = "关闭提示1111";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return "关闭提示222";
      } else {
        window.onbeforeunload = null;
      }
    };
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

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  text-align: left;
}
</style>
