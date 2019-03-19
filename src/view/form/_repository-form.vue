<template>
  <v-form @submit="handleSubmit" :form="form" class="form">
    <v-row class="form-row" :gutter="16">
      <v-col :lg="6" :md="12" :sm="24">
        <v-form-item label="仓库名">
          <v-input
            placeholder="请输入仓库名称"
            v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入仓库名称', whitespace: true}]}
            ]"/>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <v-form-item
          label="仓库域名">
          <v-input
            addonBefore="http://"
            addonAfter=".com"
            placeholder="请输入"
            v-decorator="[
              'repository.domain',
              {rules: [{ required: true, message: '请输入仓库域名', whitespace: true}, {validator: validate}]}
            ]"/>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <v-form-item
          label="仓库管理员">
          <v-select placeholder="请选择管理员" v-decorator="[ 'repository.manager', {rules: [{ required: true, message: '请选择管理员'}]} ]">
            <v-select-option value="王同学">王同学</v-select-option>
            <v-select-option value="李同学">李同学</v-select-option>
            <v-select-option value="黄同学">黄同学</v-select-option>
          </v-select>
        </v-form-item>
      </v-col>
    </v-row>
    <v-row class="form-row" :gutter="16">
      <v-col :lg="6" :md="12" :sm="24">
        <v-form-item
          label="审批人">
          <v-select placeholder="请选择审批员" v-decorator="[ 'repository.auditor', {rules: [{ required: true, message: '请选择审批员'}]} ]">
            <v-select-option value="王晓丽">王晓丽</v-select-option>
            <v-select-option value="李军">李军</v-select-option>
          </v-select>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <v-form-item
          label="生效日期">
          <v-range-picker
            style="width: 100%"
            v-decorator="[
              'repository.effectiveDate',
              {rules: [{ required: true, message: '请选择生效日期'}]}
            ]"/>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <v-form-item
          label="仓库类型">
          <v-select
            placeholder="请选择仓库类型"
            v-decorator="[
              'repository.type',
              {rules: [{ required: true, message: '请选择仓库类型'}]}
            ]">
            <v-select-option value="公开">公开</v-select-option>
            <v-select-option value="私密">私密</v-select-option>
          </v-select>
        </v-form-item>
      </v-col>
    </v-row>
    <v-form-item v-if="showSubmit">
      <v-button htmlType="submit">Submit</v-button>
    </v-form-item>
  </v-form>
</template>

<script>
  export default {
    name: 'RepositoryForm',
    props: {
      showSubmit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        form: this.$form.createForm(this),
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: values,
            });
          }
        });
      },
      validate(rule, value, callback) {
        const regex = /^user-(.*)$/;
        if (!regex.test(value)) {
          callback(new Error('需要以 user- 开头'));
        }
        callback();
      },
    },
  };
</script>

<style scoped>

</style>
