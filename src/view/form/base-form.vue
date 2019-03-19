<template>
  <page-layout title="基础表单" desc="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
    <v-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <v-form @submit="handleSubmit" :form="form">
        <v-form-item
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <v-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
            name="name"
            placeholder="给目标起个名字"/>
        </v-form-item>
        <v-form-item
          label="起止日期"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <v-range-picker
            name="buildTime"
            style="width: 100%"
            v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: '请选择起止日期' }]}
          ]"/>
        </v-form-item>
        <v-form-item
          label="目标描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <v-textarea
            rows="4"
            placeholder="请输入你阶段性工作目标"
            v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]"/>
        </v-form-item>
        <v-form-item
          label="衡量标准"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <v-textarea
            rows="4"
            placeholder="请输入衡量标准"
            v-decorator="[
            'type',
            {rules: [{ required: true, message: '请输入衡量标准' }]}
          ]"/>
        </v-form-item>
        <v-form-item
          label="客户"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <v-input
            placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"
            v-decorator="[
            'customer',
            {rules: [{ required: true, message: '请描述你服务的客户' }]}
          ]"/>
        </v-form-item>
        <v-form-item
          label="邀评人"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <v-input placeholder="请直接 @姓名／工号，最多可邀请 5 人"/>
        </v-form-item>
        <v-form-item
          label="权重"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <v-input-number :min="0" :max="100"/>
          <span> %</span>
        </v-form-item>
        <v-form-item
          label="目标公开"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
          help="客户、邀评人默认被分享"
        >
          <v-radio-group v-model="value">
            <v-radio :value="1">公开</v-radio>
            <v-radio :value="2">部分公开</v-radio>
            <v-radio :value="3">不公开</v-radio>
          </v-radio-group>
          <v-form-item>
            <v-select mode="multiple" v-if="value === 2">
              <v-select-option value="4">同事一</v-select-option>
              <v-select-option value="5">同事二</v-select-option>
              <v-select-option value="6">同事三</v-select-option>
            </v-select>
          </v-form-item>
        </v-form-item>
        <v-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <v-button htmlType="submit" type="primary">提交</v-button>
          <v-button style="margin-left: 8px">保存</v-button>
        </v-form-item>
      </v-form>
    </v-card>
  </page-layout>
</template>

<script>
  export default {
    routeConfig: {
      meta: {
        title: '基础表单',
      },
    },
    name: 'BaseForm',
    data() {
      return {
        description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
        value: 1,

        // form
        form: this.$form.createForm(this),

      };
    },
    methods: {

      // handler
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values);
          }
        });
      },
    },
  };
</script>
