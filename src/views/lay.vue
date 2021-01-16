<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh',weight:'50vw',position: 'fixed', left: 0 }">
      <div class="logo">
        <a-input-search aria-placeholder="搜索" @click="search"></a-input-search>
      </div>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart"/>
          <span>ACM</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user"/><span>计算机科学</span></span>
          <a-menu-item key="2-1">
            操作系统
          </a-menu-item>
          <a-menu-item key="2-2">
            计算机网络
          </a-menu-item>
          <a-menu-item key="2-3">
            程序设计
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team"/><span>人工智能</span></span>
          <a-menu-item key="3-1">
            语音识别
          </a-menu-item>
          <a-menu-item key="3-2">
            图像
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{marginLeft:'200px'}">
      <a-layout-header style="background: #fff; padding: 0;text-align: center;">
        <h1 style="font-size: 25px">实验系统</h1>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>计算机科学</a-breadcrumb-item>
          <a-breadcrumb-item>操作系统</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <a-row :gutter="[48,48]">
            <a-col :span="6">
              <a-card title="ubuntu" style="width: 200px">
                <a @click="onJump('6080')">
                  <div style="text-align: center">
                    <img src="../assets/VScode.png" style="height: 100px">
                    <h3>系统</h3>
                  </div>
                </a>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card title="ubuntu" style="width: 200px">
                <a @click="onJumpNewPort('6081')">
                  <div style="text-align: center">
                    <img src="../assets/logo.png" style="width: 100px;height: 100px">
                    <h3>新的系统</h3>
                  </div>
                </a>
              </a-card>
            </a-col>
            <a-col :span="6"/>
            <a-col :span="6"/>
          </a-row>
          <a-row :gutter="[48,48]">
            <a-col :span="6"/>
            <a-col :span="6"/>
            <a-col :span="6"/>
            <a-col :span="6"/>
          </a-row>
        </div>
        <!--        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                  <div v-for="i in [1,2,3,4]">
                    <a-row :gutter="16">
                      <div v-for="j in [1,2,3,4]">
                        <a-col span="6">
                          <a-card title="ubuntu" style="width: 200px">
                            <a href="" @click="onJump(i,j)">
                              <div style="text-align: center">
                                <img src="../assets/logo.png" style="width: 100px;height: 100px">
                                <h3>操作系统实验 {{(i-1)*4+j}}</h3>
                              </div>
                            </a>
                          </a-card>
                        </a-col>
                      </div>
                    </a-row>
                    <br>
                  </div>
                </div>-->
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design @ZTY
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    onJump: function (a) {
      console.log('submit!')
      // eslint-disable-next-line no-unused-vars
      console.log(this.$router)
      this.$router.push({path: '/novnc', query: {port: a}})
      // window.location.assign("http://ubuntu:"+ans)
    },
    onJumpNewPort: function (a) {
      console.log('new Port')
      console.log(a)
      var _this = this
      alert('正在创建新的容器，请确定后等待5s')
      _this.postRequest('api/startNewPort', {
        port: String(a)
      }).then(resp => {
        if (resp) {
          alert('连接成功')
          this.$router.push({path: '/novnc', query: {port: a}})
        } else {
          alert('连接服务器失败')
        }
      })
    }
  }
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
