<template>
  <v-form @submit="handleSubmit" :form="form" class="form">
    <v-row class="form-row" :gutter="16">
      <v-col :lg="6" :md="12" :sm="24">
        <v-form-item
          label="任务名">
          <v-input placeholder="请输入任务名称" v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入任务名称', whitespace: true}]} ]"/>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <v-form-item
          label="任务描述">
          <v-input placeholder="请输入任务描述" v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入任务描述', whitespace: true}]} ]"/>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <v-form-item
          label="执行人">
          <v-select
            placeholder="请选择执行人"
            v-decorator="[
              'task.executor',
              {rules: [{ required: true, message: '请选择执行人'}]}
            ]">
            <v-select-option value="黄丽丽">黄丽丽</v-select-option>
            <v-select-option value="李大刀">李大刀</v-select-option>
          </v-select>
        </v-form-item>
      </v-col>
    </v-row>
    <v-row class="form-row" :gutter="16">
      <v-col :lg="6" :md="12" :sm="24">
        <v-form-item
          label="责任人">
          <v-select
            placeholder="请选择责任人"
            v-decorator="[
              'task.manager',
              {rules: [{ required: true, message: '请选择责任人'}]}
            ]">
            <v-select-option value="王伟">王伟</v-select-option>
            <v-select-option value="李红军">李红军</v-select-option>
          </v-select>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <v-form-item
          label="提醒时间">
          <v-time-picker
            style="width: 100%"
            v-decorator="[
              'task.time',
              {rules: [{ required: true, message: '请选择提醒时间'}]}
            ]"/>
        </v-form-item>
      </v-col>
      <v-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <v-form-item
          label="任务类型">
          <v-select
            placeholder="请选择任务类型"
            v-decorator="[ 'task.type', {rules: [{ required: true, message: '请选择任务类型'}]} ]">
            <v-select-option value="定时执行">定时执行</v-select-option>
            <v-select-option value="周期执行">周期执行</v-select-option>
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
    name: 'TaskForm',
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
    },
  };
</script>

<style scoped>

</style>
