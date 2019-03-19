<template>
  <user-layout>
    <div class="main">
      <v-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
        <v-tabs :activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }" @change="handleTabClick">
          <v-tab-pane key="tab1" tab="账号密码登陆">
            <v-form-item>
              <v-input
                size="large"
                type="text"
                placeholder="帐户名或邮箱地址 / admin"
                v-decorator="['username', {initialValue: 'admin', rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}]"
              >
                <v-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </v-input>
            </v-form-item>

            <v-form-item>
              <v-input
                size="large"
                type="password"
                autocomplete="false"
                placeholder="密码 / admin"
                v-decorator="['password', {initialValue: 'admin', rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]"
              >
                <v-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </v-input>
            </v-form-item>
          </v-tab-pane>
          <v-tab-pane key="tab2" tab="手机号登陆">
            <v-form-item>
              <v-input
                size="large"
                type="text"
                placeholder="手机号"
                v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
              >
                <v-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </v-input>
            </v-form-item>

            <v-row :gutter="16">
              <v-col class="gutter-row" :span="16">
                <v-form-item>
                  <v-input
                    size="large"
                    type="text"
                    placeholder="验证码"
                    v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
                  >
                    <v-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </v-input>
                </v-form-item>
              </v-col>
              <v-col class="gutter-row" :span="8">
                <v-button class="getCaptcha" tabindex="-1" :disabled="state.smsSendBtn" @click.stop.prevent="getCaptcha" v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></v-button>
              </v-col>
            </v-row>
          </v-tab-pane>
        </v-tabs>

        <v-form-item>
          <v-checkbox v-decorator="['rememberMe']">自动登陆</v-checkbox>
          <router-link to="/forget" class="forge-password" style="float: right;">忘记密码</router-link>
        </v-form-item>

        <v-form-item style="margin-top:24px">
          <v-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn">确定</v-button>
        </v-form-item>

        <div class="user-login-other">
          <span>其他登陆方式</span>
          <a>
            <v-icon class="item-icon" type="alipay-circle"></v-icon>
          </a>
          <a>
            <v-icon class="item-icon" type="taobao-circle"></v-icon>
          </a>
          <a>
            <v-icon class="item-icon" type="weibo-circle"></v-icon>
          </a>
          <router-link class="register" to="/register">注册账户</router-link>
        </div>
      </v-form>
    </div>
  </user-layout>
</template>

<script>
  import Dates from '../library/util/dates';

  export default {
    routeConfig: {
      wrap: false,
    },
    data() {
      return {
        customActiveKey: 'tab1',
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false,
          // login type: 0 email, 1 username, 2 telephone
          loginType: 0,
          smsSendBtn: false,
        },
      };
    },
    methods: {
      // handler
      handleUsernameOrEmail(rule, value, callback) {
        const {state} = this;
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          state.loginType = 0;
        } else {
          state.loginType = 1;
        }
        callback();
      },
      handleTabClick(key) {
        this.customActiveKey = key;
        // this.form.resetFields()
      },
      handleSubmit(e) {
        e.preventDefault();
        const {
          form: {validateFields},
          state,
          customActiveKey,
        } = this;

        state.loginBtn = true;

        const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha'];

        validateFields(validateFieldsKey, {force: true}, (err, values) => {
          if (!err) {
            console.log('login form', values);
            const loginParams = {...values};
            delete loginParams.username;
            loginParams[!state.loginType ? 'email' : 'username'] = values.username;
            loginParams.password = values.password;
            this.login(loginParams).then((res) => this.loginSuccess(res)).catch(err => this.requestFailed(err)).finally(() => {
              state.loginBtn = false;
            });
          } else {
            setTimeout(() => {
              state.loginBtn = false;
            }, 600);
          }
        });
      },
      getCaptcha(e) {
        e.preventDefault();
        const {form: {validateFields}, state} = this;

        validateFields(['mobile'], {force: true}, (err, values) => {
          if (!err) {
            state.smsSendBtn = true;

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60;
                state.smsSendBtn = false;
                window.clearInterval(interval);
              }
            }, 1000);

            const hide = this.$message.loading('验证码发送中..', 0);

            this.getSmsCaptcha({mobile: values.mobile}).then(() => hide());
          }
        });
      },
      getSmsCaptcha(mobile) {
        console.log('mobile', mobile);
        return new Promise((resolve) => {
          setTimeout(() => {
            this.$notification.success({
              message: '成功',
              description: '验证码获取成功，您的验证码为：888888',
            });
            resolve(true);
          }, 400);
        });
      },
      login() {
        return this.$axios.get('http://www.mocky.io/v2/5c7cd5551000002c15760c2b');
      },
      loginSuccess() {
        this.$store.commit('authorization', Date.now());
        this.$router.push({path: '/'});
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${Dates.timeFix()}，欢迎回来`,
          });
        }, 1000);
      },
      requestFailed(err) {
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4,
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
