import ADivider from 'ant-design-vue/es/divider';

const Divider = {
  name: 'v-divider',
  mixins: [ADivider],
};

const install = (Vue) => {
  Vue.component(Divider.name, Divider);
};

Divider.install = install;

export default Divider;
