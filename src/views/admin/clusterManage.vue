<template>
  <div id="iframe-body-sty" class="iframe-body-sty">
    <iframe  id="iframe-shrink" class="iframe-shrink" :src="dashboardUrl">

    </iframe>
  </div>

</template>

<script>
const manageToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImgxVGpfM2MyMC1DMnBEbFN5MWpiMkNYSEkwdEVFTTBKcElxNGx2bS14MXMifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXVzZXItdG9rZW4tOTRsMjgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoia3Vib2FyZC11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiYWJkYWUzNzgtZmY1Zi00MThhLWI1Y2UtNTZhMjZmYTIyMGFjIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmt1Ym9hcmQtdXNlciJ9.WdYfKH9fZwykR8-dSjiiMpkMhvpLMoKYcnBExJbF1OPgrS2tfGJnaf8txGd0zZHG5lYb9FaffOXrAzOlQ3NP8MgCEBAy36yhTTCIygoGAlfvtxg8YDGmNii53hs71e9FNbAN4pbLjEONUcq1CHmc51-sGiUQw82_MYvTereZzjoWRHXzE6QkrkCvf4oySQdP7NCzxslUKJdfbDagVUMbflYGinXwfI_3g1T-vyd5ss7chRAPfbuBFRg3mJjRLdRLUt-PxTK2ZIIwZCHVAO5WiLVTn8gTCje0yd5UfrGmJDcvimw3dk-zAsCSZ7dwCXV_FXyIB-VdnUt_heOgrDtt5w'
export default {
  name: 'clusterManage',
  data () {
    // this.cacheData = data.map(item => ({...item}))
    return {
      // TODO 更改为dashboard的管理界面
      dashboardUrl: 'http://10.168.4.167:32567/dashboard?k8sToken=' + manageToken
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
