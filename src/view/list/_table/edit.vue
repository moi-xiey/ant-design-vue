<template>
  <div>
    <v-form :form="form" @submit="handleSubmit">
      <v-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="规则编号"
        hasFeedback
        validateStatus="success"
      >
        <v-input
          placeholder="规则编号"
          v-decorator="[
            'no',
            {rules: [{ required: true, message: '请输入规则编号' }]}
          ]"
          :disabled="true"
        ></v-input>
      </v-form-item>

      <v-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="服务调用次数"
        hasFeedback
        validateStatus="success"
      >
        <v-input-number :min="1" style="width: 100%" v-decorator="['callNo', {rules: [{ required: true }]}]"/>
      </v-form-item>

      <v-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="状态"
        hasFeedback
        validateStatus="warning"
      >
        <v-select v-decorator="['status', {rules: [{ required: true, message: '请选择状态' }], initialValue: '1'}]">
          <v-select-option :value="1">Option 1</v-select-option>
          <v-select-option :value="2">Option 2</v-select-option>
          <v-select-option :value="3">Option 3</v-select-option>
        </v-select>
      </v-form-item>

      <v-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="描述"
        hasFeedback
        help="请填写一段描述"
      >
        <v-textarea :rows="5" placeholder="..." v-decorator="['description', {rules: [{ required: true }]}]"/>
      </v-form-item>

      <v-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="更新时间"
        hasFeedback
        validateStatus="error"
      >
        <v-date-picker
          style="width: 100%"
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
          v-decorator="['updatedAt']"
        />
      </v-form-item>

      <v-form-item
        v-bind="buttonCol"
      >
        <v-row>
          <v-col span="6">
            <v-button type="primary" html-type="submit">提交</v-button>
          </v-col>
          <v-col span="10">
            <v-button @click="handleGoBack">返回</v-button>
          </v-col>
          <v-col span="8"></v-col>
        </v-row>
      </v-form-item>
    </v-form>
  </div>
</template>

<script>
  import moment from 'moment';
  import {pick} from 'lodash';

  export default {
    name: 'TableEdit',
    props: {
      record: {
        type: [Object, String],
        default: '',
      },
    },
    data() {
      return {
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 12},
        },
        buttonCol: {
          wrapperCol: {
            xs: {span: 24},
            sm: {span: 12, offset: 5},
          },
        },
        form: this.$form.createForm(this),
        id: 0,
      };
    },
    // beforeCreate () {
    //   this.form = this.$form.createForm(this)
    // },
    mounted() {
      this.$nextTick(() => {
        this.loadEditInfo(this.record);
      });
    },
    methods: {
      handleGoBack() {
        this.$emit('onGoBack');
      },
      handleSubmit() {
        const {form: {validateFields}} = this;
        validateFields((err, values) => {
          if (!err) {
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values);
          }
        });
      },
      handleGetInfo() {

      },
      loadEditInfo(data) {
        const {form} = this;
        // ajax
        console.log(`将加载 ${this.id} 信息到表单`);
        new Promise((resolve) => {
          setTimeout(resolve, 1500);
        }).then(() => {
          const formData = pick(data, ['no', 'callNo', 'status', 'description', 'updatedAt']);
          formData.updatedAt = moment(data.updatedAt);
          console.log('formData', formData);
          form.setFieldsValue(formData);
        });
      },
    },
  };
</script>
