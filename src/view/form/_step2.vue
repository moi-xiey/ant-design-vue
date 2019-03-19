<template>
  <div>
    <v-form style="max-width: 500px; margin: 40px auto 0;">
      <v-alert
        :closable="true"
        message="确认转账后，资金将直接打入对方账户，无法退回。"
        style="margin-bottom: 24px;"
      />
      <v-form-item
        label="付款账户"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        class="stepFormText"
      >
        ant-design@alipay.com
      </v-form-item>
      <v-form-item
        label="收款账户"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        class="stepFormText"
      >
        test@example.com
      </v-form-item>
      <v-form-item
        label="收款人姓名"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        class="stepFormText"
      >
        Alex
      </v-form-item>
      <v-form-item
        label="转账金额"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        class="stepFormText"
      >
        ￥ 5,000.00
      </v-form-item>
      <v-form-item :wrapperCol="{span: 19, offset: 5}">
        <v-button :loading="loading" type="primary" @click="nextStep">提交</v-button>
        <v-button style="margin-left: 8px" @click="prevStep">上一步</v-button>
      </v-form-item>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Step2',
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      nextStep() {
        const that = this;
        that.loading = true;
        setTimeout(function() {
          that.$emit('nextStep');
        }, 1500);
      },
      prevStep() {
        this.$emit('prevStep');
      },
    },
  };
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
