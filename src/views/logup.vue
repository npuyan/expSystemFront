<template>
  <div class="login-container">
    <a-card title="注册新用户" class="cardSystem">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" has-feedback>
      <span slot="label">
              学号&nbsp;
        <a-tooltip title="唯一用户名">
          <a-icon type="question-circle-o"/>
        </a-tooltip>
      </span>
          <a-input
            v-decorator="[
          'username',
          {
            rules: [{ required: true, message: '请输入学号!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
          <a-input
            v-decorator="[
          'confirm password',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
            <span slot="label">
              邮箱&nbsp;
        <a-tooltip title="用于找回密码和身份验证">
          <a-icon type="question-circle-o"/>
        </a-tooltip>
      </span>
          <a-input
            v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '邮箱格式错误!',
              },
              {
                required: true,
                message: '请输入邮箱!',
              },
            ],
          },
        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="手机">
          <a-input
            v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入手机号码!' }],
          },
        ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
              <a-select-option value="87">
                +87
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox v-decorator="['agreement', { rules: [
              {
                required: true,
                message: '请确认!',
              } ],valuePropName: ['checked' ]}]">
            已经阅读
            <a href="">
              注册须知
            </a>
          </a-checkbox>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit">
            注册
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: {span: 24},
          sm: {span: 6}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {
            span: 15,
            offset: 2
          }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 24,
            offset: 0
          }
        }
      },
      form: this.$form.createForm(this, {name: 'coordinated'})
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {name: 'register'})
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      var _this = this
      _this.form.validateFieldsAndScroll((err, values) => {
        if (values.agreement === true) {
          if (!err) {
            console.log('Received values of form: ', values)
            _this.postRequest('/api/logup', values
            ).then(resp => {
              if (resp) {
                alert('注册成功')
                var data = resp.data
                let path = _this.$route.query.redirect
                _this.$router.push('/')
              } else {
                alert('注册失败')
              }
            })
          }
        } else {
          alert('未确认！')
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致!')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], {force: true})
      }
      callback()
    }
  }
}
</script>
<style acoped>
.cardSystem {
  text-align: center;
  font-size: 40px;
  width: 50vw;
  margin: 5vh auto;
  padding: 2vh;
  background-color: rgba(255, 255, 255, 0.7);
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  /*background-image: url("../assets/plane.jpg");*/
  background-size: 100% 100%;
}
</style>
