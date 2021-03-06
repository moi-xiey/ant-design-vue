<template>
  <user-layout>
    <div class="main user-layout-register">
      <h3><span>注册</span></h3>
      <v-form ref="formRegister" :form="form" id="formRegister">
        <v-form-item>
          <v-input
            size="large"
            type="text"
            placeholder="邮箱"
            v-decorator="['email', {rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}]"
          ></v-input>
        </v-form-item>

        <v-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
          <template slot="content">
            <div :style="{ width: '240px' }">
              <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
              <v-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
              <div style="margin-top: 10px;">
                <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
              </div>
            </div>
          </template>
          <v-form-item>
            <v-input
              size="large"
              type="password"
              @click="handlePasswordInputClick"
              autocomplete="false"
              placeholder="至少6位密码，区分大小写"
              v-decorator="['password', {rules: [{required: true, message: '至少6位密码，区分大小写'}, {validator: this.handlePasswordLevel}], validateTrigger: ['change', 'blur']}]"
            ></v-input>
          </v-form-item>
        </v-popover>

        <v-form-item>
          <v-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="确认密码"
            v-decorator="['password2', {rules: [{required: true, message: '至少6位密码，区分大小写'}, {validator: this.handlePasswordCheck}], validateTrigger: ['change', 'blur']}]"
          ></v-input>
        </v-form-item>

        <v-form-item>
          <v-input
            size="large"
            placeholder="11 位手机号"
            v-decorator="['mobile', {rules: [{required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/}, {validator: this.handlePhoneCheck }], validateTrigger: ['change', 'blur']}]"
          >
            <v-select slot="addonBefore" size="large" defaultValue="+86">
              <v-select-option value="+86">+86</v-select-option>
              <v-select-option value="+87">+87</v-select-option>
            </v-select>
          </v-input>
        </v-form-item>
        <!--<v-input-group size="large" compact>
              <v-select style="width: 20%" size="large" defaultValue="+86">
                <v-select-option value="+86">+86</v-select-option>
                <v-select-option value="+87">+87</v-select-option>
              </v-select>
              <v-input style="width: 80%" size="large" placeholder="11 位手机号"></v-input>
            </v-input-group>-->

        <v-row :gutter="16">
          <v-col class="gutter-row" :span="16">
            <v-form-item>
              <v-input
                size="large"
                type="text"
                placeholder="captcha"
                v-decorator="['captcha', {rules: [{required: true, message: '请输入验证码'}], validateTrigger: 'blur'}]"
              >
                <v-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </v-input>
            </v-form-item>
          </v-col>
          <v-col class="gutter-row" :span="8">
            <v-button
              class="getCaptcha"
              size="large"
              :disabled="state.smsSendBtn"
              @click.stop.prevent="getCaptcha"
              v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></v-button>
          </v-col>
        </v-row>

        <v-form-item>
          <v-button
            size="large"
            type="primary"
            htmlType="submit"
            class="register-button"
            :loading="registerBtn"
            @click.stop.prevent="handleSubmit"
            :disabled="registerBtn">注册
          </v-button>
          <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
        </v-form-item>

      </v-form>
    </div>
  </user-layout>
</template>

<script>
  import {mixinDevice} from '../library/util/mixin.js';

  const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强',
  };
  const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success',
  };
  const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a',
  };

  export default {
    routeConfig: {
      wrap: false,
    },
    name: 'Register',
    components: {},
    mixins: [mixinDevice],
    data() {
      return {
        form: this.$form.createForm(this),

        state: {
          time: 60,
          smsSendBtn: false,
          passwordLevel: 0,
          passwordLevelChecked: false,
          percent: 10,
          progressColor: '#FF0000',
        },
        registerBtn: false,
      };
    },
    computed: {
      passwordLevelClass() {
        return levelClass[this.state.passwordLevel];
      },
      passwordLevelName() {
        return levelNames[this.state.passwordLevel];
      },
      passwordLevelColor() {
        return levelColor[this.state.passwordLevel];
      },
    },
    methods: {

      handlePasswordLevel(rule, value, callback) {
        let level = 0;

        // 判断这个字符串中有没有数字
        if (/[0-9]/.test(value)) {
          level++;
        }
        // 判断字符串中有没有字母
        if (/[a-zA-Z]/.test(value)) {
          level++;
        }
        // 判断字符串中有没有特殊符号
        if (/[^0-9a-zA-Z_]/.test(value)) {
          level++;
        }
        this.state.passwordLevel = level;
        this.state.percent = level * 30;
        if (level >= 2) {
          if (level >= 3) {
            this.state.percent = 100;
          }
          callback();
        } else {
          if (level === 0) {
            this.state.percent = 10;
          }
          callback(new Error('密码强度不够'));
        }
      },

      handlePasswordCheck(rule, value, callback) {
        const password = this.form.getFieldValue('password');
        console.log('value', value);
        if (value === undefined) {
          callback(new Error('请输入密码'));
        }
        if (value && password && value.trim() !== password.trim()) {
          callback(new Error('两次密码不一致'));
        }
        callback();
      },

      handlePhoneCheck(rule, value, callback) {
        console.log('handlePhoneCheck, rule:', rule);
        console.log('handlePhoneCheck, value', value);
        console.log('handlePhoneCheck, callback', callback);

        callback();
      },

      handlePasswordInputClick() {
        if (!this.isMobile()) {
          this.state.passwordLevelChecked = true;
          return;
        }
        this.state.passwordLevelChecked = false;
      },

      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$router.push({name: 'registerResult', params: {...values}});
          }
        });
      },

      getCaptcha(e) {
        e.preventDefault();
        const that = this;

        this.form.validateFields(['mobile'], {force: true},
          (err, values) => {
            if (!err) {
              this.state.smsSendBtn = true;

              const interval = window.setInterval(() => {
                if (that.state.time-- <= 0) {
                  that.state.time = 60;
                  that.state.smsSendBtn = false;
                  window.clearInterval(interval);
                }
              }, 1000);

              const hide = this.$message.loading('验证码发送中..', 0);

              this.getSmsCaptcha({mobile: values.mobile}).then(() => hide());
            }
          },
        );
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
      requestFailed(err) {
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4,
        });
        this.registerBtn = false;
      },
    },
    watch: {
      'state.passwordLevel'(val) {
        console.log(val);
      },
    },
  };
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
