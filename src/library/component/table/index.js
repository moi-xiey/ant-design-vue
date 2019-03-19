import ATable from 'ant-design-vue/es/table';

const Table = {
  name: 'v-table',
  mixins: [ATable],
};

const TableColumn = {
  name: 'v-table-column',
  mixins: [ATable.Column],
};

const TableColumnGroup = {
  name: 'v-table-column-group',
  mixins: [ATable.ColumnGroup],
};

const install = (Vue) => {
  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);
  Vue.component(TableColumnGroup.name, TableColumnGroup);
};

Table.install = install;
Table.Column = TableColumn;
Table.ColumnGroup = TableColumnGroup;

export default Table;
