<template>
  <page-layout title="角色列表" desc="列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。">
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
                  <v-select-option value="1">正常</v-select-option>
                  <v-select-option value="2">禁用</v-select-option>
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

      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
      >
        <div
          slot="expandedRowRender"
          slot-scope="record"
          style="margin: 0">
          <v-row
            :gutter="24"
            :style="{ marginBottom: '12px' }">
            <v-col :span="12" v-for="(role, index) in record.permissions" :key="index" :style="{ marginBottom: '12px' }">
              <v-col :span="4">
                <span>{{ role.permissionName }}：</span>
              </v-col>
              <v-col :span="20" v-if="role.actionEntitySet.length > 0">
                <v-tag color="cyan" v-for="(action, k) in role.actionEntitySet" :key="k">{{ action.describe }}</v-tag>
              </v-col>
              <v-col :span="20" v-else>-</v-col>
            </v-col>
          </v-row>
        </div>
        <span slot="action" slot-scope="text, record">
        <a @click="$refs.modal.edit(record)">编辑</a>
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

      <role-modal ref="modal" @ok="handleOk"></role-modal>

    </v-card>
  </page-layout>
</template>

<script>
  import STable from '../../component/table';
  import RoleModal from './_modules/role-modal';

  export default {
    routeConfig: {
      meta: {title: '角色列表'},
    },
    name: 'TableList',
    components: {
      STable,
      RoleModal,
    },
    data() {
      return {
        visible: false,

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
            title: '角色名称',
            dataIndex: 'name',
          },
          {
            title: '状态',
            dataIndex: 'status',
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            sorter: true,
          }, {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
          },
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return this.$axios.get('http://www.mocky.io/v2/5c8ddaee3000000d001b0ca8', {
            params: Object.assign(parameter, this.queryParam),
          }).then(res => {
            return res.result;
          });
        },

        selectedRowKeys: [],
        selectedRows: [],
      };
    },
    methods: {
      handleEdit(record) {
        this.mdl = Object.assign({}, record);

        this.mdl.permissions.forEach(permission => {
          permission.actionsOptions = permission.actionEntitySet.map(action => {
            return {label: action.describe, value: action.action, defaultCheck: action.defaultCheck};
          });
        });

        console.log(this.mdl);
        this.visible = true;
      },
      handleOk() {
        // 新增/修改 成功时，重载列表
        this.$refs.table.refresh();
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
