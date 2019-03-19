import ACascader from 'ant-design-vue/es/cascader';

const Cascader = {
  name: 'v-cascader',
  mixins: [ACascader],
};

const install = (Vue) => {
  Vue.component(Cascader.name, Cascader);
};

Cascader.install = install;

export default Cascader;
