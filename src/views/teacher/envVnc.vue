<template>
<div>
  <iframe id="novncframe" class="novnc" :src="fullUrl"> </iframe>

  <a-button type="primary" @click="save()"> 保存</a-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      fullUrl: "http://124.70.84.98:" + this.$route.query.port,
      envObj: this.$route.query.envObj,
      saveEnvUrl: "api/savecourseenvtoimage",
    };
  },

  methods: {
    save() {
      this.postRequest(this.saveEnvUrl, {
        username: this.$store.state.userName,
        courseenv: this.envObj,
      }).then((resp) => {
        if (resp) {
            console.log("返回结果", resp)
          alert("镜像保存成功");
        }
      });
    },
  },
};
</script>
<style scoped>
.novnc {
  height: 900px;
  width: 1200px;
  /* float: left; */
}
</style>