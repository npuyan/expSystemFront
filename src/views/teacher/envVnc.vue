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
      labObj: this.$route.query.labObj,
      saveEnvUrl: "api/savecourseenvtoimage",
    };
  },

  methods: {
    save() {
      console.log({
        username: this.$store.state.userName,
        courselab: this.labObj
      })
      this.postRequest(this.saveEnvUrl, {
        username: this.$store.state.userName,
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