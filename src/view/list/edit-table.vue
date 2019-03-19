<template>
  <page-layout title="内联编辑表格">
    <v-card :bordered="false">
      <div class="table-page-search-wrapper">
        <v-form layout="inline">
          <v-row :gutter="48">
            <v-col :md="8" :sm="24">
              <v-form-item label="规则编号">
                <v-input placeholder=""/>
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
            <template v-if="advanced">
              <v-col :md="8" :sm="24">
                <v-form-item label="调用次数">
                  <v-input-number style="width: 100%"/>
                </v-form-item>
              </v-col>
              <v-col :md="8" :sm="24">
                <v-form-item label="更新日期">
                  <v-date-picker style="width: 100%" placeholder="请输入更新日期"/>
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
              <v-button type="primary">查询</v-button>
              <v-button style="margin-left: 8px">重置</v-button>
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
        <v-button type="primary" icon="plus">新建</v-button>
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
        :columns="columns"
        :data="loadData"
        :alert="{ show: true, clear: true }"
        :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
      >
        <template v-for="(col, index) in columns" v-if="col.scopedSlots" :slot="col.dataIndex" slot-scope="text, record, index">
          <div :key="index">
            <v-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col, record)"
            />
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="action" slot-scope="text, record, index">
          <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record)">保存</a>
            <v-divider type="vertical"/>
            <v-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
              <a>取消</a>
            </v-popconfirm>
          </span>
            <span v-else>
            <a class="edit" @click="() => edit(record)">修改</a>
            <v-divider type="vertical"/>
            <a class="delete" @click="() => del(record)">删除</a>
          </span>
          </div>
        </template>
      </s-table>

    </v-card>
  </page-layout>
</template>

<script>
  import STable from '../../component/table';

  export default {
    routeConfig: {
      meta: {title: '内联编辑表格'},
    },
    name: 'TableList',
    components: {
      STable,
    },
    data() {
      return {
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '规则编号',
            dataIndex: 'no',
            width: 90,
          },
          {
            title: '描述',
            dataIndex: 'description',
            scopedSlots: {customRender: 'description'},
          },
          {
            title: '服务调用次数',
            dataIndex: 'callNo',
            width: '150px',
            sorter: true,
            needTotal: true,
            scopedSlots: {customRender: 'callNo'},
            // customRender: (text) => text + ' 次'
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: '100px',
            needTotal: true,
            scopedSlots: {customRender: 'status'},
          },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            width: '200px',
            sorter: true,
            scopedSlots: {customRender: 'updatedAt'},
          },
          {
            table: '操作',
            dataIndex: 'action',
            width: '120px',
            scopedSlots: {customRender: 'action'},
          },
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return this.$axios.get('http://www.mocky.io/v2/5c8dd3ad310000602c4c2716', {
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

      handleChange(value, key, column, record) {
        console.log(value, key, column);
        record[column.dataIndex] = value;
      },
      edit(row) {
        row.editable = true;
        // row = Object.assign({}, row)
      },
      // eslint-disable-next-line
      del(row) {
        this.$confirm({
          title: '警告',
          content: `真的要删除 ${row.no} 吗?`,
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log('OK');
            // 在这里调用删除接口
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      save(row) {
        row.editable = false;
      },
      cancel(row) {
        row.editable = false;
      },

      onSelectChange(selectedRowKeys, selectedRows) {
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

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
