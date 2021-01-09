<template>
  <div class="login-container">

    <!--    <a-card class="login-form">-->
    <a-form class="login-form" id="login-form" :form="form">
      <h2 class="login-title">实验系统</h2>
      <a-form-item>
        <a-input v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]" placeholder="用户名">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
        <br>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
                 type="password" placeholder="密码">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        >
          记住我 &nbsp&nbsp
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码
        </a>
        <div>
          <a-button @click="onSubmit" type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          Or
          <router-link :to="{path:'/logup'}">
          <a href="" @click="">
            注册
          </a>
          </router-link>
        </div>
      </a-form-item>
    </a-form>
    <!--    </a-card>-->

  </div>
</template>
<script>
export default {
  // beforeCreate () {
  //   this.form = this.$form.createForm(this, {name: 'login-form'})
  // },
  data () {
    return {
      form: this.$form.createForm(this, {name: 'coordinated'}),
    }
  },

  methods: {
    onSubmit: function (e) {
      e.preventDefault()
      var _this = this
      // _this.$router.replace('/home');
      _this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          _this.postRequest('/login', {
            username: values.username,
            password: values.password
          }).then(resp => {
            if (resp) {
              var data = resp.data
              // this.$store.commit('INIT_CURRENTHR', resp.obj)
              let path = _this.$route.query.redirect
              alert(path)
              _this.$router.replace((path == '/' || path == undefined) ? '/lay' : path)
            } else {
              _this.vcUrl = '/verifyCode?time=' + new Date()
            }
          })
        }
      })
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
  background-color: rgba(255, 255, 255, 0.7);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 20px;
}

.titil_form {
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
