<template>
  <div>
    <v-form style="max-width: 500px; margin: 40px auto 0;">
      <v-form-item
        label="付款账户"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <v-select value="1" placeholder="ant-design@alipay.com">
          <v-select-option value="1">ant-design@alipay.com</v-select-option>
        </v-select>
      </v-form-item>
      <v-form-item
        label="收款账户"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <v-input-group :compact="true" style="display: inline-block; vertical-align: middle">
          <v-select defaultValue="alipay" style="width: 100px">
            <v-select-option value="alipay">支付宝</v-select-option>
            <v-select-option value="wexinpay">微信</v-select-option>
          </v-select>
          <v-input :style="{width: 'calc(100% - 100px)'}" value="test@example.com"/>
        </v-input-group>
      </v-form-item>
      <v-form-item
        label="收款人姓名"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <v-input value="Alex"/>
      </v-form-item>
      <v-form-item
        label="转账金额"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <v-input prefix="￥" value="5000"/>
      </v-form-item>
      <v-form-item :wrapperCol="{span: 19, offset: 5}">
        <v-button type="primary" @click="nextStep">下一步</v-button>
      </v-form-item>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Step1',
    methods: {
      nextStep() {
        this.$emit('nextStep');
      },
    },
  };
</script>

<style scoped>

</style>
