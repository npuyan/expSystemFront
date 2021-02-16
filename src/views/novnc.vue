<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider width="35vw" :style="{overflow:'auto',height:'100vh',background: '#fff'}" v-model="collapsed"
                    collapsible>
      <div v-if="!collapsed">
        <div id="buttongroup" style="margin: 2vh">
          <a-button-group :size="large">
            <a-button type="primary" @click="">
              <a-icon type="left"/>
              上一节
            </a-button>
            <a-button type="dash">
              章节一：熟悉系统
            </a-button>
            <a-button type="primary">
              下一节
              <a-icon type="right"/>
            </a-button>
          </a-button-group>
        </div>
        <div id="markdow" style="text-align: left">
          <h2>注意</h2>
          <p>1.下方箭头开启/收回</p>
          <p>2.复制粘贴需要使用右侧小箭头内的共享粘贴板</p>
          <p>3.右侧小箭头设置栏可以调整缩放模式为本地模式</p>
          <p>4.显示红色noVNC 遇到一个错误，请刷新</p>
          <p>5.“系统”是一直打开同一个容器，“新的系统"是每次开启一个新的容器</p>
          <img src="../assets/logo.png">
        </div>
        <!--        <div id="markdow"  style="text-align: left">
                  <h1>实验教程</h1>
                  <h2>一、实验目的</h2>
                  <p>通过第一节课程的学习，你应该已经知道， Linux
                    是一个可以实现多用户登录的操作系统，比如“李雷”和“韩梅梅”都可以同时登录同一台主机，他们共享一些主机的资源，但他们也分别有自己的用户空间，用于存放各自的文件。但实际上他们的文件都是放在同一个物理磁盘上的甚至同一个逻辑分区或者目录里，但是由于
                    Linux 的 用户管理 和 权限机制，不同用户不可以轻易地查看、修改彼此的文件。

                    下面我们就来学习一下 Linux 下的账户管理的基础知识。</p>
                  <img src="../assets/logo.png">
                  <h2>二、实验内容</h2>
                  <p>通过第一节课程的学习，你应该已经知道， Linux
                    是一个可以实现多用户登录的操作系统，比如“李雷”和“韩梅梅”都可以同时登录同一台主机，他们共享一些主机的资源，但他们也分别有自己的用户空间，用于存放各自的文件。但实际上他们的文件都是放在同一个物理磁盘上的甚至同一个逻辑分区或者目录里，但是由于
                    Linux 的 用户管理 和 权限机制，不同用户不可以轻易地查看、修改彼此的文件。

                    下面我们就来学习一下 Linux 下的账户管理的基础知识。</p>
                  <p>通过第一节课程的学习，你应该已经知道， Linux
                    是一个可以实现多用户登录的操作系统，比如“李雷”和“韩梅梅”都可以同时登录同一台主机，他们共享一些主机的资源，但他们也分别有自己的用户空间，用于存放各自的文件。但实际上他们的文件都是放在同一个物理磁盘上的甚至同一个逻辑分区或者目录里，但是由于
                    Linux 的 用户管理 和 权限机制，不同用户不可以轻易地查看、修改彼此的文件。

                    下面我们就来学习一下 Linux 下的账户管理的基础知识。</p>
                  <p>通过第一节课程的学习，你应该已经知道， Linux
                    是一个可以实现多用户登录的操作系统，比如“李雷”和“韩梅梅”都可以同时登录同一台主机，他们共享一些主机的资源，但他们也分别有自己的用户空间，用于存放各自的文件。但实际上他们的文件都是放在同一个物理磁盘上的甚至同一个逻辑分区或者目录里，但是由于
                    Linux 的 用户管理 和 权限机制，不同用户不可以轻易地查看、修改彼此的文件。

                    下面我们就来学习一下 Linux 下的账户管理的基础知识。</p>
                </div>-->
      </div>
      <br><br><br>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div :id="this.$route.params.port" :style="{padding:'2vh',background: '#fff', height:'100vh' }">
          <iframe id="novncframe" class="novnc" :src=fullUrl>
          </iframe>
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
  data () {
    return {
      collapsed: false,
      port: this.$route.query.port,
      url: 'http://49.234.13.89:'
    }
  },
  computed: {
    fullUrl: function () {
      return this.url + '' + this.port
    }
  },
  methods: {
    test: function () {
      alert(this.port)
    }
  },
  mounted () {
    let _this = this
    window.onbeforeunload = function (e) {
      if (_this.$route.name == 'novnc') {
        e = e || window.event
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示1111'
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示222'
      } else {
        window.onbeforeunload = null
      }
    }
  }
}
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
  margin-bottom: 15px
}
</style>
