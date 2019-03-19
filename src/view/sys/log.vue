<template>
  <div class="container">
    <v-table :columns="columns" :dataSource="data" :loading="loading" rowKey="id"></v-table>
    <v-drawer :visible.sync="visible" @close="onClose" title="编辑" width="460">
      <log-form :toolbar="false" ref="form" :log-id="logId" :label-col="{}" :wrapper-col="{}"/>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <v-button :style="{marginRight: '8px'}" icon="close" @click="onClose">取消</v-button>
        <v-button @click="handleSubmit" icon="check" type="primary">保存</v-button>
      </div>
    </v-drawer>
  </div>
</template>

<script type="text/jsx">
  import LogForm from './log.form';
  import Dates from '../../library/util/dates';

  export default {
    routeConfig: {
      meta: {
        title: "日志管理",
      },
    },
    name: 'sys-log',
    components: {
      LogForm,
    },
    data() {
      return {
        data: [],
        loading: false,
        visible: false,
        logId: '',
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            width: '80px',
            sorter: (a, b) => a.id - b.id,
          }, {
            title: '名称',
            dataIndex: 'name',
          }, {
            title: '编码',
            dataIndex: 'code',
            filters: [
              {
                text: 'ADMIN',
                value: 'ADMIN',
              },
              {
                text: 'BUREAU',
                value: 'BUREAU',
              },
              {
                text: 'OFFICE',
                value: 'OFFICE',
              },
            ],
            onFilter: (value, record) => record.code.indexOf(value) === 0,
          }, {
            title: '说明',
            dataIndex: 'descs',
          }, {
            title: '菜单',
            dataIndex: 'menuIds',
            customRender: (text) => {
              return (
                <div class="ellipsis" title={text}>{text}</div>
              );
            },
          }, {
            title: '创建日期',
            dataIndex: 'createDate',
            customRender: (createDate) => Dates.format(createDate),
          }, {
            width: 200,
            title: '操作',
            customRender: (text, record) => {
              return (
                <v-fragment>
                  <a href="javascript:;" onClick={() => this.open(record.id)}>本页面编辑</a>
                  <v-divider type="vertical"/>
                  <router-link to={{
                    path: '/sys/log.form',
                    query: {id: record.id},
                  }}>新页面编辑
                  </router-link>
                </v-fragment>
              );
            },
          }],
      };
    },
    mounted() {
      this.load();
    },
    methods: {
      load() {
        this.loading = true;
        this.$axios.get('http://www.mocky.io/v2/5c791281300000b33949b1a7').then(res => {
          this.data = res.data;
          this.loading = false;
        });
      },
      open(logId) {
        this.logId = logId;
        this.visible = true;
      },
      onClose() {
        this.visible = false;
        this.$refs.form.form.resetFields();
      },
      handleSubmit() {
        const {validateFields} = this.$refs.form.form;
        validateFields((errors, values) => {
          if (errors) {
            return;
          }
          this.$notification.success({
            message: '提交数据',
            description: JSON.stringify(values),
          });
          this.onClose();
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    background: #fff;
  }

  .ellipsis {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
