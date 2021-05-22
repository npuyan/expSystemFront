<template>
  <div id="iframe-body-sty" class="iframe-body-sty">
    <iframe  id="iframe-shrink" class="iframe-shrink" :src="dashboardUrl">

    </iframe>
  </div>

</template>

<script>
const manageToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFvQ0pHa3h1QXNBZnJidFQzM1BScTlRZWN6WnZnQnJheC1HYWtTR1VHblUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXVzZXItdG9rZW4tbGRnYmciLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoia3Vib2FyZC11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNzc1OGI3MDItMjlkYS00OWQyLWIwYWQtNzkyZTM5ZDFmYzk1Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmt1Ym9hcmQtdXNlciJ9.zbuwXVUh0rydjcM20NO0JCOwRFc2j0QBndyDOS7WnpX1cEY1kTq5p1FhPSiC_tSw6OUsglS4Je1hQbo43HBpx9ZI0cvYkdIAiFjFiLbSPxjAN8-0YXOHgRZ56fVLu-x-IhldtRBAwIGpBCwvgRFDW3JyYO5ZOrn_tKCdveA6WHyI_mOQBYU6GJxfIufiNwECcrsbSOeIlpGB7-w_L1TObiJtj9y3GgpC_jd3leeHtge8mfxDny3h7WtjJwUp3pQa5A_ag3ip3hyAJjyD9jy5yi7KTPf3ZKAKSeAWyRvRWBroErJenvU2E2WPtPa1ZHeDttVZB79cu8SDl5m_doYRrg'
export default {
  name: 'clusterManage',
  data () {
    // this.cacheData = data.map(item => ({...item}))
    return {
      // TODO 更改为dashboard的管理界面
      dashboardUrl: 'http://202.117.249.18:32567/dashboard?k8sToken=' + manageToken
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
