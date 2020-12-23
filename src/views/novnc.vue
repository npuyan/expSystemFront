<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider width="35vw" :style="{overflow:'auto',height:'100vh',background: '#fff'}" v-model="collapsed"
                    collapsible>
      <div id="buttongroup" style="margin: 2vh">
        <a-button-group v-if="!collapsed" :size="large">
          <a-button type="primary">
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
      <div id="markdow" v-if="!collapsed" style="text-align: left">
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
      </div>
      <br><br><br>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div :style="{padding:'2vh',background: '#fff', height:'100vh' }">
          <iframe id="novncframe" src="http://49.234.13.89:6080" class="novnc">
          </iframe>a
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
      collapsed: false
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

<!--<template>-->
<!--  <div class="layout">-->
<!--    <Layout :style="{minHeight: '100vh'}">-->
<!--      <Sider width="500" collapsible :collapsed-width="78" v-model="isCollapsed">&ndash;&gt;-->
<!--        <Menu style="height: 100%" theme="light" width="auto" :class="menuitemClasses" scrolling="auto">-->
<!--          <div style="text-align: left">-->
<!--            <h1>实验教程</h1>-->
<!--            <h2>一、实验目的</h2>-->
<!--            <p>通过第一节课程的学习，你应该已经知道， Linux-->
<!--              是一个可以实现多用户登录的操作系统，比如“李雷”和“韩梅梅”都可以同时登录同一台主机，他们共享一些主机的资源，但他们也分别有自己的用户空间，用于存放各自的文件。但实际上他们的文件都是放在同一个物理磁盘上的甚至同一个逻辑分区或者目录里，但是由于-->
<!--              Linux 的 用户管理 和 权限机制，不同用户不可以轻易地查看、修改彼此的文件。-->

<!--              下面我们就来学习一下 Linux 下的账户管理的基础知识。</p>-->
<!--            <img src="../assets/logo.png">-->
<!--            <h2>二、实验内容</h2>-->
<!--            <p>通过第一节课程的学习，你应该已经知道， Linux-->
<!--              是一个可以实现多用户登录的操作系统，比如“李雷”和“韩梅梅”都可以同时登录同一台主机，他们共享一些主机的资源，但他们也分别有自己的用户空间，用于存放各自的文件。但实际上他们的文件都是放在同一个物理磁盘上的甚至同一个逻辑分区或者目录里，但是由于-->
<!--              Linux 的 用户管理 和 权限机制，不同用户不可以轻易地查看、修改彼此的文件。-->

<!--              下面我们就来学习一下 Linux 下的账户管理的基础知识。</p>-->
<!--          </div>-->
<!--        </Menu>-->
<!--      </Sider>-->
<!--      &ndash;&gt;-->
<!--      <Layout>-->
<!--        <Card style="height: 100%;width: auto">-->
<!--          <iframe id="novncframe" src="http://ubuntu:6080" class="novnc"></iframe>-->
<!--        </Card>-->
<!--      </Layout>-->
<!--    </Layout>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import lay from './lay'-->

<!--export default {-->
<!--  name: 'novnc',-->
<!--  data () {-->
<!--    return {-->
<!--      isCollapsed: false-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    menuitemClasses: function () {-->
<!--      return [-->
<!--        'menu-item',-->
<!--        this.isCollapsed ? 'collapsed-menu' : ''-->
<!--      ]-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->

<!--</style>-->
