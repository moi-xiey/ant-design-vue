<template>
  <div class="container">
    <v-spin :spinning="loading">
      <v-card :bordered="false">
        <v-form @submit="handleSubmit" :form="form">
          <v-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <v-input v-decorator="['name', {rules: [{ required: true, message: '请输入名称' }]}]" name="name" placeholder="请输入名称"/>
          </v-form-item>
          <v-form-item label="编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <v-input v-decorator="['code', {rules: [{ required: true, message: '请输入编码' }]}]" name="code" placeholder="请输入编码"/>
          </v-form-item>
          <v-form-item label="说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <v-textarea v-decorator="['descs', {rules: [{ required: true, message: '请输入说明' }]}]" name="descs" placeholder="请输入说明"/>
          </v-form-item>
          <v-form-item label="菜单" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <v-select v-decorator="['menuIdsArr', {rules: [{ required: true, message: '请输入说明' }]}]" name="menuIdsArr" mode="multiple" @change="handleMenuChange" placeholder="请选择菜单">
              <v-select-option v-for="i in 50" :key="String(i)">{{'菜单' + String(i)}}</v-select-option>
            </v-select>
          </v-form-item>

          <v-form-item v-if="toolbar" label=" " :colon="false" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <v-button icon="rollback" @click="back">返回</v-button>
            <v-button htmlType="submit" type="primary" style="float: right;" icon="check">保存</v-button>
          </v-form-item>
        </v-form>
      </v-card>
    </v-spin>
  </div>
</template>

<script>
  export default {
    routeConfig: {
      meta: {
        title: "日志编辑",
      },
    },
    name: 'sys-log-form',
    props: {
      toolbar: {
        type: Boolean,
        default: true,
      },
      logId: Number,
      labelCol: {
        default: () => ({
          span: 7,
        }),
      },
      wrapperCol: {
        default: () => ({
          span: 10,
        }),
      },
    },
    data() {
      return {
        description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
        value: 1,
        // form
        form: this.$form.createForm(this),
        loading: false,
      };
    },
    computed: {
      realLogId() {
        if (this.logId) {
          return this.logId;
        }
        const {id} = this.$router.currentRoute.query;
        if (id) {
          return id;
        }
        return null;
      },
    },
    watch: {
      realLogId() {
        this.load(this.realLogId);
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        // 创建 id 隐藏表单项
        this.form.getFieldDecorator('id', {preserve: true});
        this.form.getFieldDecorator('menuIds', {preserve: true});
        this.load(this.realLogId);
      },
      load(id) {
        if (!id) {
          return;
        }
        this.loading = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.loading = false;
          this.form.setFieldsValue({
            code: 'ADMIN',
            descs: '交通运输部管理员',
            id: 1,
            menuIds: '1',
            menuIdsArr: ['1'],
            name: '交通运输部管理员',
          });
        }, 600);
      },
      // handler
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.$notification.success({
              message: '提交数据',
              description: JSON.stringify(values, null, 2),
            });
            this.back();
          }
        });
      },
      handleMenuChange(val) {
        this.form.setFieldsValue({menuIds: val.join(',')});
      },
      back() {
        this.$router.back();
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    margin: 20px;
  }
</style>
