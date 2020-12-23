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
        </div>
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
    search: function () {
      console.log('1')
    },
    onJump: function (a, b) {
      console.log('submit!')
      // eslint-disable-next-line no-unused-vars
      var ans = (6080 + ((a - 1) * 4) + (b - 1))
      console.log(this.$router)
      this.$router.push('novnc')
      // window.location.assign("http://ubuntu:"+ans)
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

<!--<style scoped>-->
<!--  .layout {-->
<!--    border: 1px solid #d7dde4;-->
<!--    background: #f5f7f9;-->
<!--    position: relative;-->
<!--    border-radius: 4px;-->
<!--    overflow: hidden;-->
<!--  }-->

<!--  .layout-header-bar {-->
<!--    background: #fff;-->
<!--    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);-->
<!--  }-->

<!--  .card_sty {-->
<!--    width: 200px;-->
<!--  }-->
<!--</style>-->
<!--<template>-->
<!--  <a-layout>-->

<!--  </a-layout>-->
<!--</template>-->
<!--<template>-->
<!--  <div class="layout">-->
<!--    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">-->
<!--      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" style="margin-top: 80px">-->
<!--        <Submenu name="1">-->
<!--          <template slot="title">-->
<!--            <Icon type="ios-navigate"></Icon>-->
<!--            计算机科学-->
<!--          </template>-->
<!--          <MenuItem name="1-1">操作系统</MenuItem>-->
<!--          <MenuItem name="1-2">计算机网络</MenuItem>-->
<!--          <MenuItem name="1-3">程序设计</MenuItem>-->
<!--        </Submenu>-->
<!--        <Submenu name="2">-->
<!--          <template slot="title">-->
<!--            <Icon type="ios-keypad"></Icon>-->
<!--            ACM-->
<!--          </template>-->
<!--          <MenuItem name="2-1">操作系统</MenuItem>-->
<!--          <MenuItem name="2-2">操作系统</MenuItem>-->
<!--        </Submenu>-->
<!--        <Submenu name="3">-->
<!--          <template slot="title">-->
<!--            <Icon type="ios-analytics"></Icon>-->
<!--            人工智能-->
<!--          </template>-->
<!--          <MenuItem name="3-1">操作系统</MenuItem>-->
<!--          <MenuItem name="3-2">操作系统</MenuItem>-->
<!--        </Submenu>-->
<!--      </Menu>-->
<!--    </Sider>-->
<!--    <Layout :style="{marginLeft: '200px'}">-->
<!--      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',fontSize:'30px'}">实验系统</Header>-->
<!--      <Content :style="{padding: '0 16px 16px'}">-->
<!--        <Breadcrumb :style="{margin: '16px 0'}">-->
<!--          <BreadcrumbItem>实验</BreadcrumbItem>-->
<!--          <BreadcrumbItem>实验</BreadcrumbItem>-->
<!--          <BreadcrumbItem>1</BreadcrumbItem>-->
<!--        </Breadcrumb>-->
<!--        <Card>-->
<!--          <div v-for="i in [1,2,3,4]">-->
<!--            <Row :gutter="16">-->
<!--              <div v-for="j in [1,2,3,4]">-->
<!--                <Col span="6">-->
<!--                  <a target="_blank" href="javascript:void(0);" @click="onJump(i,j)">-->
<!--                    <Card class="card_sty">-->
<!--                      <div style="text-align: center">-->
<!--                        <img src="../assets/logo.png" style="width: 100px;height: 100px">-->
<!--                        <h3>操作系统 {{(i-1)*4+j}}</h3>-->
<!--                      </div>-->
<!--                    </Card>-->
<!--                  </a>-->
<!--                </Col>-->
<!--              </div>-->
<!--            </Row>-->
<!--            <br>-->
<!--          </div>-->
<!--        </Card>-->
<!--      </Content>-->
<!--    </Layout>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'lay',-->
<!--  methods: {-->
<!--    onJump: function (a, b) {-->
<!--      console.log('submit!')-->
<!--      // eslint-disable-next-line no-unused-vars-->
<!--      var ans = (6080 + ((a - 1) * 4) + (b - 1))-->
<!--      console.log(this.$router)-->
<!--      this.$router.replace('/novnc')-->
<!--      // window.location.assign("http://ubuntu:"+ans)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
