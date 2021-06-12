<template>
  <div id="iframe-body-sty" class="iframe-body-sty">
    <iframe  id="iframe-shrink" class="iframe-shrink" :src="dashboardUrl">

    </iframe>
  </div>

</template>

<script>
const manageToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFvQ0pHa3h1QXNBZnJidFQzM1BScTlRZWN6WnZnQnJheC1HYWtTR1VHblUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXVzZXItdG9rZW4tajlxZGwiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoia3Vib2FyZC11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMTdlZTg2YWQtOGQzZi00ZjNkLWIwYWEtM2QxM2YzMmYzMGYyIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmt1Ym9hcmQtdXNlciJ9.X_SQ8QOwcgNRXhGw29lSQHPPhqE9ddvi_6V4HWNs0CBsGfDofprBixKq9luHEsilnO1f8JtcTdK357UExUXqAfZ3UPWBw2JQTkHK11-CG8n21rm361TrvO9DVi1_0JR33Xi4F3ZuFU5ZvUKCpn6mTAA_5PoGLWsi7p_3qNtEfbPkTQiF56OII7ai7ifWXnQvPDXiXgTs51UrIYKK45AIb81B3uIpXHChBG6lcwn-PBfI7w_bOB2J5zwnG7nfPAPEsi5BDcLgF-8m0KYkaT30Vsh2lQFbv3JfnVj3cK-6j3VtWH1a9GFp6NpflHQw3R9SYV5HBob7ZFupU0VT7IzlOg'
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
