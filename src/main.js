// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Antd from 'ant-design-vue'
import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import {Form} from 'view-design'
// import VueMarkdownEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import {postRequest, postKeyValueRequest, putRequest, deleteRequest, getRequest} from './utils/api'

// VueMarkdownEditor.use(vuepressTheme);
Vue.use(mavonEditor)
Vue.use(Antd)
Vue.use(Button)
Vue.use(Form)
// Vue.use(VueMarkdownEditor)

Vue.prototype.postRequest = postRequest
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest

Vue.config.productionTip = false
/* 打包到tomcat需要修改config/index.js 和在router/index.js中增加base */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
