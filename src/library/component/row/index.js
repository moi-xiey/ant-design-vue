import ARow from 'ant-design-vue/es/row';

const Row = {
  name: 'v-row',
  mixins: [ARow],
};

const install = (Vue) => {
  Vue.component(Row.name, Row);
};

Row.install = install;

export default Row;
