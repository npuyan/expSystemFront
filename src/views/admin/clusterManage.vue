<template>
  <div id="iframe-body-sty" class="iframe-body-sty">
    <iframe  id="iframe-shrink" class="iframe-shrink" :src="dashboardUrl">

    </iframe>
  </div>

</template>

<script>
export default {
  name: 'clusterManage',
  data () {
    // this.cacheData = data.map(item => ({...item}))
    return {
      // TODO 更改为dashboard的管理界面
      dashboardUrl: 'https://124.70.84.98:30433/'
    }
  }
}
</script>

<style scoped>
.novnc {
  height: 85vh;
  width: 100%;

  /*float: left;*/
  /*background-color: #000c17;*/
}

.iframe-body-sty {
  position: relative;
  overflow: hidden;
  height: 85vh;
  width: 100%;
}

.iframe-body-sty > #iframe-shrink {
  /*position: absolute;*/
  /*transform: scale(0.55);*/
  height: 100%;
  width: 100%;
}

</style>
