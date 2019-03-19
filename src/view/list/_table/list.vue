<template>
  <div>
    <div class="table-page-search-wrapper">
      <v-form layout="inline">
        <v-row :gutter="48">
          <v-col :md="8" :sm="24">
            <v-form-item label="规则编号">
              <v-input v-model="queryParam.id" placeholder=""/>
            </v-form-item>
          </v-col>
          <v-col :md="8" :sm="24">
            <v-form-item label="使用状态">
              <v-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <v-select-option value="0">全部</v-select-option>
                <v-select-option value="1">关闭</v-select-option>
                <v-select-option value="2">运行中</v-select-option>
              </v-select>
            </v-form-item>
          </v-col>
          <template v-if="advanced">
            <v-col :md="8" :sm="24">
              <v-form-item label="调用次数">
                <v-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </v-form-item>
            </v-col>
            <v-col :md="8" :sm="24">
              <v-form-item label="更新日期">
                <v-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </v-form-item>
            </v-col>
            <v-col :md="8" :sm="24">
              <v-form-item label="使用状态">
                <v-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <v-select-option value="0">全部</v-select-option>
                  <v-select-option value="1">关闭</v-select-option>
                  <v-select-option value="2">运行中</v-select-option>
                </v-select>
              </v-form-item>
            </v-col>
            <v-col :md="8" :sm="24">
              <v-form-item label="使用状态">
                <v-select placeholder="请选择" default-value="0">
                  <v-select-option value="0">全部</v-select-option>
                  <v-select-option value="1">关闭</v-select-option>
                  <v-select-option value="2">运行中</v-select-option>
                </v-select>
              </v-form-item>
            </v-col>
          </template>
          <v-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <v-button type="primary" @click="$refs.table.refresh(true)">查询</v-button>
              <v-button style="margin-left: 8px" @click="() => queryParam = {}">重置</v-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <v-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <div class="table-operator">
      <v-button type="primary" icon="plus" @click="handleEdit('')">新建</v-button>
      <v-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</v-button>
      <v-dropdown v-if="selectedRowKeys.length > 0">
        <v-menu slot="overlay">
          <v-menu-item key="1">
            <v-icon type="delete"/>
            删除
          </v-menu-item>
          <!-- lock | unlock -->
          <v-menu-item key="2">
            <v-icon type="lock"/>
            锁定
          </v-menu-item>
        </v-menu>
        <v-button style="margin-left: 8px">
          批量操作
          <v-icon type="down"/>
        </v-button>
      </v-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <v-divider type="vertical"/>
        </template>
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
  </div>
</template>

<script>
  import moment from 'moment';
  import STable from '../../../component/table';

  export default {
    name: 'TableList',
    components: {
      STable,
    },
    data() {
      return {
        mdl: {},
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '#',
            scopedSlots: {customRender: 'serial'},
          },
          {
            title: '规则编号',
            dataIndex: 'no',
          },
          {
            title: '描述',
            dataIndex: 'description',
          },
          {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            needTotal: true,
            customRender: (text) => text + ' 次',
          },
          {
            title: '状态',
            dataIndex: 'status',
            needTotal: true,
          },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: true,
          },
          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: {customRender: 'action'},
          },
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          console.log('loadData.parameter', parameter);
          return this.$axios.get('http://www.mocky.io/v2/5c8dd3ad310000602c4c2716', {params: Object.assign(parameter, this.queryParam)}).then(res => {
            return res.result;
          });
        },
        selectedRowKeys: [],
        selectedRows: [],

        // custom table alert & rowSelection
        options: {
          alert: {
            show: true, clear: () => {
              this.selectedRowKeys = [];
            },
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
          },
        },
        optionAlertShow: false,
      };
    },
    created() {
      this.tableOption();
    },
    methods: {
      tableOption() {
        if (!this.optionAlertShow) {
          this.options = {
            alert: {
              show: true, clear: () => {
                this.selectedRowKeys = [];
              },
            },
            rowSelection: {
              selectedRowKeys: this.selectedRowKeys,
              onChange: this.onSelectChange,
            },
          };
          this.optionAlertShow = true;
        } else {
          this.options = {
            alert: false,
            rowSelection: null,
          };
          this.optionAlertShow = false;
        }
      },

      handleEdit(record) {
        this.$emit('onEdit', record);
      },
      handleOk() {

      },

      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      },
      toggleAdvanced() {
        this.advanced = !this.advanced;
      },

      resetSearchForm() {
        this.queryParam = {
          date: moment(new Date()),
        };
      },
    },
  };
</script>
