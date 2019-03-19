import APopconfirm from 'ant-design-vue/es/popconfirm';

const Popconfirm = {
  name: 'v-popconfirm',
  mixins: [APopconfirm],
};

const install = (Vue) => {
  Vue.component(Popconfirm.name, Popconfirm);
};

Popconfirm.install = install;

export default Popconfirm;
