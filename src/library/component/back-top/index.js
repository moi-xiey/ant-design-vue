import ABackTop from 'ant-design-vue/es/back-top';

const BackTop = {
  name: 'v-back-top',
  mixins: [ABackTop],
};

const install = (Vue) => {
  Vue.component(BackTop.name, BackTop);
};

BackTop.install = install;

export default BackTop;
