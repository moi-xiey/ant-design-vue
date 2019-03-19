<template>
  <page-layout title="权限列表" :desc="description">
    <v-card :bordered="false">
      <div class="table-page-search-wrapper">
        <v-form layout="inline">
          <v-row :gutter="48">
            <v-col :md="8" :sm="24">
              <v-form-item label="角色ID">
                <v-input placeholder="请输入"/>
              </v-form-item>
            </v-col>
            <v-col :md="8" :sm="24">
              <v-form-item label="状态">
                <v-select placeholder="请选择" default-value="0">
                  <v-select-option value="0">全部</v-select-option>
                  <v-select-option value="1">关闭</v-select-option>
                  <v-select-option value="2">运行中</v-select-option>
                </v-select>
              </v-form-item>
            </v-col>
            <v-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <v-button type="primary">查询</v-button>
              <v-button style="margin-left: 8px">重置</v-button>
            </span>
            </v-col>
          </v-row>
        </v-form>
      </div>

      <s-table :columns="columns" :data="loadData">

      <span slot="actions" slot-scope="text, record">
        <v-tag v-for="(action, index) in record.actionList" :key="index">{{ action.describe }}</v-tag>
      </span>

        <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>

        <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <v-divider type="vertical"/>
        <v-dropdown>
          <a class="ant-dropdown-link">
            更多 <v-icon type="down"/>
          </a>
          <v-menu slot="overlay">
            <v-menu-item>
              <a href="javascript:;">详情</a>
            </v-menu-item>
            <v-menu-item>
              <a href="javascript:;">禁用</a>
            </v-menu-item>
            <v-menu-item>
              <a href="javascript:;">删除</a>
            </v-menu-item>
          </v-menu>
        </v-dropdown>
      </span>
      </s-table>

      <v-modal
        title="操作"
        :width="800"
        v-model="visible"
        @ok="handleOk"
      >
        <v-form :autoFormCreate="(form)=>{this.form = form}">

          <v-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="唯一识别码"
            hasFeedback
            validateStatus="success"
          >
            <v-input placeholder="唯一识别码" v-model="mdl.id" id="no" disabled="disabled"/>
          </v-form-item>

          <v-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="权限名称"
            hasFeedback
            validateStatus="success"
          >
            <v-input placeholder="起一个名字" v-model="mdl.name" id="permission_name"/>
          </v-form-item>

          <v-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="状态"
            hasFeedback
            validateStatus="warning"
          >
            <v-select v-model="mdl.status">
              <v-select-option value="1">正常</v-select-option>
              <v-select-option value="2">禁用</v-select-option>
            </v-select>
          </v-form-item>

          <v-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="描述"
            hasFeedback
          >
            <v-textarea :rows="5" v-model="mdl.describe" placeholder="..." id="describe"/>
          </v-form-item>

          <v-divider/>

          <v-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="赋予权限"
            hasFeedback
          >
            <v-select
              style="width: 100%"
              mode="multiple"
              v-model="mdl.actions"
              :allowClear="true"
            >
              <v-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">{{ action.label }}</v-select-option>
            </v-select>
          </v-form-item>

        </v-form>
      </v-modal>

    </v-card>
  </page-layout>
</template>

<script>
  import STable from '../../component/table';

  export default {
    routeConfig: {
      meta: {title: '权限列表'},
    },
    name: 'TableList',
    components: {
      STable,
    },
    data() {
      return {
        description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

        visible: false,
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        form: null,
        mdl: {},

        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '唯一识别码',
            dataIndex: 'id',
          },
          {
            title: '权限名称',
            dataIndex: 'name',
          },
          {
            title: '可操作权限',
            dataIndex: 'actions',
            scopedSlots: {customRender: 'actions'},
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: {customRender: 'status'},
          },
          {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
          },
        ],
        // 向后端拉取可以用的操作列表
        permissionList: null,
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return this.$axios.get('http://www.mocky.io/v2/5c8dde9530000063001b0cac', {
            params: Object.assign(parameter, this.queryParam),
          }).then(res => {
            const result = res.result;
            result.data.map(permission => {
              permission.actionList = JSON.parse(permission.actionData);
              return permission;
            });
            return result;
          });
        },

        selectedRowKeys: [],
        selectedRows: [],
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '正常',
          2: '禁用',
        };
        return statusMap[status];
      },
    },
    created() {
      this.loadPermissionList();
    },
    methods: {
      loadPermissionList() {
        // permissionList
        new Promise(resolve => {
          const data = [
            {label: '新增', value: 'add', defaultChecked: false},
            {label: '查询', value: 'get', defaultChecked: false},
            {label: '修改', value: 'update', defaultChecked: false},
            {label: '列表', value: 'query', defaultChecked: false},
            {label: '删除', value: 'delete', defaultChecked: false},
            {label: '导入', value: 'import', defaultChecked: false},
            {label: '导出', value: 'export', defaultChecked: false},
          ];
          setTimeout(resolve(data), 1500);
        }).then(res => {
          this.permissionList = res;
        });
      },
      handleEdit(record) {
        this.mdl = Object.assign({}, record);
        console.log(this.mdl);
        this.visible = true;
      },
      handleOk() {

      },
      onChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      },
      toggleAdvanced() {
        this.advanced = !this.advanced;
      },
    },
    watch: {
      /*
        'selectedRows': function (selectedRows) {
          this.needTotalList = this.needTotalList.map(item => {
            return {
              ...item,
              total: selectedRows.reduce( (sum, val) => {
                return sum + val[item.dataIndex]
              }, 0)
            }
          })
        }
        */
    },
  };
</script>
