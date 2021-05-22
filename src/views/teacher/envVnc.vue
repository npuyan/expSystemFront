<template>
<div>
  <iframe id="novncframe" class="novnc" :src="fullUrl"> </iframe>

  <a-button type="primary" @click="save()"> 保存</a-button>
  <a-button type="default" @click="update()"> 刷新页面</a-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      // fullUrl: "http://124.70.84.98:" + this.$route.query.port,
      // fullUrl: "http://10.168.4.167:" + this.$route.query.port,
      fullUrl: "http://202.117.249.18:" + this.$route.query.port,
      envObj: this.$route.query.envObj,
      labObj: this.$route.query.labObj,
      saveEnvUrl: "api/savecourseenvtoimage",
    };
  },

  methods: {
    save() {
      // {
      //   courseId: 36,
      //   courseName: "操作系统",
      //   docPath: "14.pdf",
      //   envId: 1,
      //   labId: 14,
      //   labName: "Linux操作系统的安装及使用",
      //   remarks: "学习Linux操作系统的安装，体会操作系统为了方便用户，不断改进的安装过程；熟悉Linux系统的登录和退出，并熟悉它常用命令的操作使用方法。",
      //   sectionId: 1
      // }
      console.log({
        username: this.$store.state.userName,
        courseenv: this.envObj,
        courselab: this.labObj
      })
      this.postRequest(this.saveEnvUrl, {
        username: this.$store.state.userName,
        courseenv: this.envObj,
        courselab: this.labObj
      }).then((resp) => {
        if (resp) {
            console.log("返回结果", resp)
          alert("镜像保存成功");
        }
      });
    },
    update() {
      this.$forceUpdate();
      console.log(this.fullUrl)

    }
  },
};
</script>
<style scoped>
.novnc {
  height: 950px;
  width: 1600px;
  /* float: left; */
}
</style>