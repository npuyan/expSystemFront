im

<template>
  <div class="login-container">
    <a-card class="login-form">
        <h2 class="login-title">实验系统</h2>
        <a-input v-model="form.username" placeholder="用户名" clearable style="margin-top: 10px"></a-input>
        <br>
        <a-input v-model="form.password" placeholder="密码" clearable style="margin-top: 10px"></a-input>
        <router-link to='/lay'>
          <a-button-group style="margin-top: 20px" size="large" shape="circle">
            <a-button type="primary" @click="onSubmit">登录</a-button>
            <a-button type="dashed" @click="onSubmit">注册</a-button>
          </a-button-group>
        </router-link>
    </a-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      console.log('submit!')
      // this.$router.push({path: '/'})
    }
  }
}
</script>

<style acoped>
  .login-form {
    width: 350px;
    position: relative;
    left: 70%;
    top: 50%;
    background-color: rgba(255, 255, 255,0.7);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 30px;
    border-radius: 20px;
  }
  .titil_form{
    width: 100px;
    height: 100vw;
    border: 20px;
  }
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../assets/plane.jpg");
    background-size: 100% 100%;
  }

  /* 标题 */
  .login-title {
    color: #303133;
    text-align: center;
    margin-bottom: 20px;
  }
</style> -->
